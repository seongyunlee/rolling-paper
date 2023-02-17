const cookie = require("cookie");

//make /index page
exports.index = (req, res) => {
  res.render("index", { user_id: req.session.uid });
};
