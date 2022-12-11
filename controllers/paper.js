const {mongo} = require('../index');
const {createCanvas} =require('canvas');
const { request } = require('express');

exports.share = async(req,res) =>{
    await (async (req,res)=>{
        const db = mongo.db('rollingpaper');
        const coll= db.collection('paper');
        const result = await (await coll.find({id:Number(req.params.paperId)}).toArray()).at(0);
        res.render('share',{paperId:result.id,title:result.title,backColor:result.backColor,url:`http:/172.30.1.14/paper/${result.id}`});
    })(req,res);
}

exports.draw = async(req,res) =>{
    await (async (req,res)=>{
        const db = mongo.db('rollingpaper');
        const coll= db.collection('paper');
        const result = await (await coll.find({id:Number(req.params.paperId)}).toArray()).at(0);
        res.render('share',{paperId:result.id,title:result.title,backColor:result.backColor,url:`http:/172.30.1.14/paper/${result.id}`});
    })(req,res);
}

exports.newMessage = async(req,res) =>{
    await (async (req,res)=>{
        const pageId = req.get('Referer').split('/').at(-1);
        const db = mongo.db('rollingpaper');
        const coll= db.collection('paper');
        const result = await coll.updateOne({id:Number(pageId)},{$push:{message:req.body.message}});
        console.log(result,pageId);
        res.redirect(req.get('Referer'));
    })(req,res);
}

exports.gallery = async(req,res) =>{
    await (async (req,res)=>{
        const db = mongo.db('rollingpaper');
        const coll= db.collection('paper');
        const result = await (await coll.find({id:Number(req.params.paperId)}).toArray()).at(0);
        res.render('gallery',{paperId:result.id,title:result.title,messages:result.message,backColor:result.backColor,url:`http:/172.30.1.14/paper/${result.id}`,});
    })(req,res);
}