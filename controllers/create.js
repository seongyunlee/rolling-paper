const {mongo} = require('../index');
const {createCanvas} =require('canvas');
const { request } = require('express');
const url = require('url');

exports.createNew =  async(req,res) =>{
    await (async (req,res)=>{
        
        const db = mongo.db('rollingpaper');
        const coll = db.collection('paper');
        let newid = 0;
        while(true){
            newid = Math.floor(Math.random() * 8999999999) + 1000000000;
            const result = await coll.find({id:newid}).toArray();
            console.log(result);
            break;
        }
        await coll.insertOne({id:newid,backColor:req.query.color,title:req.query.title});
        res.redirect('http://'+req.headers.host+`/paper/share/${newid}`);    
    }) (req,res);
}
