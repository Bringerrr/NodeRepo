const express = require("express");
const router = express.Router();
const path = require("path");
const axios = require("axios");

router.post("/run", (req, res) => {
  const { body, headers, url, method } = req.body;
  axios({
    method,
    url,
    data: body,
    headers
  })
    .then(axiosResponse => {
      console.log("postaman/run success");
      // console.log("axiosResponse", axiosResponse);
      const { status, headers, data } = axiosResponse;
      const body = {
        status,
        headers,
        data
      };
      return res.json(body);
    })
    .catch(err => {
      console.log("postaman/run error");
      if (err.config) {
        return res.json(err.config.headers);
      }
      return res.json(err);
    });
});

module.exports = router;
