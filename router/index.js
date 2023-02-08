const express = require("express");
const router = express.Router();
const controller = require("../controllers/index");

router.get("/", controller.index);
router.get("/login", (req, res) => res.render("login", {}));
router.get("/register", (req, res) => res.render("register", {}));

module.exports = router;
