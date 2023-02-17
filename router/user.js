const express = require("express");
const { route } = require(".");
const router = express.Router();
const controller = require("../controllers/user");

// /paper/share/{id}
router.post("/login", controller.login);
router.get("/logout", controller.logout);
router.post("/register", controller.register);
router.get("/list", controller.list);
router.get("/koauth", controller.koauth);
module.exports = router;
