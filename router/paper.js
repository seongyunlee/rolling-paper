const express = require("express");
const router = express.Router();
const controller = require("../controllers/paper");
const aws = require("../tools/aws");

// /paper/share/{id}
router.get("/share/:paperId", controller.share);

router.get("/:paperId", controller.gallery);

router.post("/newMessage/:paperId", controller.newMessage);

router.post("/uploads3", aws.imageUpload);

module.exports = router;
