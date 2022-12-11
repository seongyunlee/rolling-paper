const cookie = require('cookie')

//make /index page
exports.index =  async(req,res) =>{
    await (async (req,res)=>{
        res.render('index',{user_id:req.cookies.user_id});
    }) (req,res);
}
