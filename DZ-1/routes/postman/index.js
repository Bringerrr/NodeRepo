const express = require("express");
const router = express.Router();
const path = require("path");
const axios = require("axios");

router.post("/run", (req, res) => {
  const { body, headers, url, method } = req.body;
  const startRequest = Date.now();
  axios({
    method,
    url,
    data: body,
    headers
  })
    .then(axiosResponse => {
      console.log("postaman/run success");
      // console.log("axiosResponse", axiosResponse);
      const endRequest = Date.now();
      const time = endRequest - startRequest;
      const { status, headers, data } = axiosResponse;
      const body = {
        status,
        headers,
        data,
        time
      };
      return res.json(body);
    })
    .catch(err => {
      console.log("postaman/run error", err);
      const endRequest = Date.now();
      const time = endRequest - startRequest;
      let sendingHeaders = {};

      const { status, headers, data } = err.response;

      const body = {
        status,
        headers,
        data,
        time
      };
      if (err.config) {
        sendingHeaders = err.config.headers;
      }
      return res.json(body);
    });
});

module.exports = router;
