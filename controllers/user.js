const { mongo } = require("../index");
const { createCanvas } = require("canvas");
const { request } = require("express");
const cookie = require("cookie");
const bcrypt = require("bcrypt");
const SALT_LENGTH = 10;
const axios = require("axios");
const configJson = require("../config.json");
// get post data body and redirect to referer

exports.logout = (req, res) => {
  if (req.session.uid) {
    req.session.destroy(() => res.redirect("/"));
  }
};
// get post data body, make new user entitiy and redirect to referer
const register = async (kakao_uid) => {
  const db = mongo.db("rollingpaper");
  const coll = db.collection("user");
  let newid = 0;
  while (true) {
    newid = Math.floor(Math.random() * 8999999999) + 1000000000;
    const result = await coll.find({ id: newid }).toArray();
    break;
  }
  await coll.insertOne({ uid: newid, kakao_uid: kakao_uid });
  return newid;
};
//make /list/{user_id} page
exports.list = async (req, res) => {
  const uid = req.session?.uid;
  const db = mongo.db("rollingpaper");
  const coll = db.collection("paper");
  const result = await coll.find({ owner: uid }).toArray();
  res.render("list", { items: result });
};

async function getKakaoToken(code) {
  try {
    const response = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      {
        grant_type: "authorization_code",
        client_id: configJson.kakao_api,
        redirect_uri: `https://${configJson.domain}/user/koauth`,
        code: code,
      },
      {
        headers: {
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

exports.koauth = async (req, res) => {
  const response = await getKakaoToken(req.query.code);
  if (!response?.id_token) {
    res.redirect("/");
  }
  const [header, payload, signature] = response.id_token.split(".");
  const user_info = JSON.parse(
    Buffer.from(payload, "base64").toString("utf-8")
  );

  const db = mongo.db("rollingpaper");
  const coll = db.collection("user");
  const result = await coll.findOne({ kakao_uid: user_info.sub });
  let uid = null;
  if (result) {
    uid = result.uid;
  } else {
    uid = register(user_info.sub);
  }
  req.session.uid = uid;
  req.session.save(() => {
    res.redirect("/");
  });
};
