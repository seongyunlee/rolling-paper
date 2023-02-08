const { mongo } = require("../index");
const { createCanvas } = require("canvas");
const { request } = require("express");
const url = require("url");
const { copyBase } = require("../tools/aws");

//create new paper
exports.createNew = async (req, res) => {
  const db = mongo.db("rollingpaper");
  const coll = db.collection("paper");
  let newid = 0;
  while (true) {
    newid = Math.floor(Math.random() * 8999999999) + 1000000000;
    const result = await coll.find({ id: newid }).toArray();
    console.log(result);
    break;
  }
  const location = copyBase(req.query.gradientId, newid);
  await coll.insertOne({
    id: newid,
    image_src: location,
    owner: req.session.email,
    message: [],
  });
  res.redirect("http://" + req.headers.host + `/paper/share/${newid}`);
};
//craete new message
exports.create = async (req, res) => {
  if (req.session.email) {
    res.render("create", {});
  } else {
    res.send(
      "<script>alert('로그인이 필요합니다.');location.href='/login';</script>"
    );
  }
};
