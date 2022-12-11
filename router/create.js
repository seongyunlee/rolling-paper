const express = require('express');
const router = express.Router();
const controller = require('../controllers/create');


// /create/
router.get('/',(req,res)=>res.render('create',{}));

// create/new
router.get('/new',controller.createNew);




module.exports = router

