const { mongo } = require("../index");
const { createCanvas, Image } = require("canvas");
const { request } = require("express");
const { imageUpload } = require("../tools/aws");
const configJson = require("../config.json");

//make /share page
exports.share = async (req, res) => {
  try {
    const db = mongo.db("rollingpaper");
    const coll = db.collection("paper");
    const result = await (
      await coll.find({ id: Number(req.params.paperId) }).toArray()
    ).at(0);
    const baseImage = `${configJson.s3Url}/rollingpaper/userImage/${req.params.paperId}.png`;
    res.render("share", {
      paperId: result.id,
      title: result.title,
      background: baseImage,
      url: `${configJson.domain}/paper/${result.id}`,
    });
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
};
// get post data body and redirect to referer
/*
exports.newMessage = async(req,res) =>{
    await (async (req,res)=>{
        if(req.body.message==''){
            res.redirect(req.get('Referer'));
        }
        else{
        const pageId = req.get('Referer').split('/').at(-1);
        const db = mongo.db('rollingpaper');
        const coll= db.collection('paper');
        const result = await coll.updateOne({id:Number(pageId)},{$push:{message:req.body.message}});
        console.log(req.body);
        res.redirect(req.get('Referer'));
        }
    })(req,res);
}*/

exports.newMessage = async (req, res) => {
  if (req.body.message == "") {
    //res.redirect(req.get('Referer'));
  } else {
    const pageId = req.get("Referer").split("/").at(-1);
    const canvas = createCanvas();
    const ctx = canvas.getContext("2d");
    const baseImage = new Image();
    canvas.width = 300;
    canvas.height = 500;
    baseImage.onload = () => {
      ctx.drawImage(baseImage, req.body.posX * 300, req.body.posY * 500);
      if (true) {
        ctx.textBaseline = "top";
        ctx.font = "10px Arial";
        ctx.fillText(req.body.message.trim(), 0, 0);
      } else {
      }
      imageUpload(pageId, canvas.toDataURL());
      res.redirect(req.get("Referer"));
    };
    baseImage.src = `${configJson.s3Url}/rollingpaper/userImage/${pageId}.png`;
  }
};

// make /page/{pageID} page
exports.gallery = async (req, res) => {
  res.render("gallery", {
    background: `${configJson.s3Url}/rollingpaper/userImage/${req.params.paperId}.png`,
  });
};
