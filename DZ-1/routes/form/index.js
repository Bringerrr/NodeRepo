const express = require("express");
const router = express.Router();
const validate = require("../../helpers/validateForm");

router.get("/", (req, res) => {
  res.render("form", {
    title: "Login",
    fields: {
      username: "",
      password: ""
    }
  });
});
router.post("/", (req, res) => {
  res.redirect(301, "/form");
  res.render("form", {
    title: "Login",
    validation: validate(req.body),
    fields: req.body
  });
  // res.sendStatus(302);
});

module.exports = router;
