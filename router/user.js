const express = require('express');
const { route } = require('.');
const router = express.Router();
const controller = require('../controllers/user');


// /paper/share/{id}
router.post('/login',controller.login);
router.post('/register',controller.register);
router.get('/list/:email',controller.list);

module.exports = router

