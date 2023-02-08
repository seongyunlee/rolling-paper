const express = require("express");
const router = express.Router();
const controller = require("../controllers/create");

// /create/
router.get("/", controller.create);

// create/new
router.get("/new", controller.createNew);

module.exports = router;
