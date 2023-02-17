const express = require("express");
const router = express.Router();
const controller = require("../controllers/index");
const configJson = require("../config.json");

router.get("/", controller.index);
router.get("/login", (req, res) =>
  res.render("login", {
    url: `https://kauth.kakao.com/oauth/authorize?client_id=${configJson.kakao_api}&redirect_uri=https://${configJson.domain}&response_type=code`,
  })
);
router.get("/register", (req, res) => res.render("register", {}));

module.exports = router;
