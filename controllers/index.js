const cookie = require('cookie')

exports.index =  async(req,res) =>{
    await (async (req,res)=>{
        res.render('index',{user_id:req.cookies.user_id});
    }) (req,res);
}
