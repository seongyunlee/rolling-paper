const {mongo} = require('../index');
const {createCanvas} =require('canvas');
const { request } = require('express');
const cookie = require('cookie');

// get post data body and redirect to referer
exports.login = async(req,res) =>{
    await (async (req,res)=>{
        const {email, password} = req.body;
        const db = mongo.db('rollingpaper');
        const coll= db.collection('user');
        const result = await coll.findOne({id:email});
        console.log(result);
        if(result && result.password == password){
            res.append('Set-Cookie', `user_id=${email}; Path=/`);
            res.redirect('/');
        }
        else{
            res.send("<script>alert('비밀번호가 틀렸습니다.');location.href='/login';</script>");
        }
    })(req,res);
}

// get post data body, make new user entitiy and redirect to referer
exports.register = async(req,res) =>{
    await (async (req,res)=>{
        const {email, password} = req.body;
        const db = mongo.db('rollingpaper');
        const coll= db.collection('user');
        const result = await coll.findOne({id:email});
        if(result){
            res.send("<script>alert('이미 존재하는 이메일입니다.');location.href='/register';</script>");
        }
        else{
            await coll.insertOne({id:email,password:password});
            res.send("<script>alert('회원가입 완료.');location.href='/login';</script>")
        }
    })(req,res);
}


//make /list/{user_id} page
exports.list = async(req,res) =>{
    await (async (req,res)=>{
        const {email} = req.params;
        const db = mongo.db('rollingpaper');
        const coll= db.collection('paper');
        const result = await (await( coll.find({owner:email})).toArray());
        console.log(result);
        res.render('list',{items:result})
    })(req,res);
}