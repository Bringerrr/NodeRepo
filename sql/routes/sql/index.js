const express = require("express");
const router = express.Router();
const sequelize = require("../../db");

const userIsExist = (data, user) => {
  return data.some(element => {
    console.log(" check user existance", element.whoVoted[user], "user", user);
    return element.whoVoted[user] === true;
  });
};

router.post("/run", (req, res) => {
  sequelize
    .query(req.body.query, {
      logging: console.log
    })
    .then(response => {
      // Results will be an empty array and metadata will contain the number of affected rows.
      console.log("results", response);
      return res.status(200).send({ response });
    })
    .catch(e => {
      console.log("eeror", e.parent);
      return res.status(400).send(e);
    });
});

module.exports = router;
