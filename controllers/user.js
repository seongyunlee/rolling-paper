const { mongo } = require("../index");
const { createCanvas } = require("canvas");
const { request } = require("express");
const cookie = require("cookie");
const bcrypt = require("bcrypt");
const SALT_LENGTH = 10;
const axios = require("axios");
const configJson = require("../config.json");

// get post data body and redirect to referer
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const db = mongo.db("rollingpaper");
  const coll = db.collection("user");
  const result = await coll.findOne({ id: email });
  if (result && bcrypt.compareSync(password, result.password)) {
    req.session.email = email;
    req.session.save(() => {
      res.redirect("/");
    });
  } else {
    res.send(
      "<script>alert('비밀번호가 틀렸습니다.');location.href='/login';</script>"
    );
  }
};
exports.logout = (req, res) => {
  if (req.session.email) {
    req.session.destroy(() => res.redirect("/"));
  }
};
// get post data body, make new user entitiy and redirect to referer
const register = async (req, res) => {
  const { email, password } = req.body;
  const db = mongo.db("rollingpaper");
  const coll = db.collection("user");
  const result = await coll.findOne({ id: email });
  if (result) {
    res.send(
      "<script>alert('이미 존재하는 이메일입니다.');location.href='/register';</script>"
    );
  } else {
    const salt = bcrypt.genSaltSync(SALT_LENGTH);
    const hashed = bcrypt.hashSync(password, salt);
    await coll.insertOne({ id: email, password: hashed });
    res.send(
      "<script>alert('회원가입 완료.');location.href='/login';</script>"
    );
  }
};
//make /list/{user_id} page
exports.list = async (req, res) => {
  const email = req.session.email;
  const db = mongo.db("rollingpaper");
  const coll = db.collection("paper");
  const result = await coll.find({ owner: email }).toArray();
  res.render("list", { items: result });
};

async function getKakaoToken(code, url) {
  try {
    const response = await axios.post(
      url,
      {
        grant_type: "authorization_code",
        client_id: configJson.kakao_api,
        redirect_uri: url,
        code: code,
      },
      {
        headers: {
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }
    );
    console.log(response.data); // handle response data as needed
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

exports.koauth = async (req, res) => {
  console.log(req.host, req.orginalUrl);
  console.log(req.body?.id_token);
  console.log(req.query);
  /*
  const { email, password } = req.body;
  const db = mongo.db("rollingpaper");
  const coll = db.collection("user");
  const result = await coll.findOne({ id: email });
  if (result && bcrypt.compareSync(password, result.password)) {
    req.session.email = email;
    req.session.save(() => {
      res.redirect("/");
    });
  } else {
    res.send(
      "<script>alert('비밀번호가 틀렸습니다.');location.href='/login';</script>"
    );
  }
  */
};
