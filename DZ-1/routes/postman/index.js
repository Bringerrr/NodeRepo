const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const moment = require('moment');

const dataPath = './assets/postman/data.json';

router.get('/requests', (req, res) => {
  fs.readFile(path.resolve(dataPath), 'utf8', (err, data) => {
    console.log('data', data);
    if (err) throw err;
    return res.json(JSON.parse(data));
  });
});

router.post('/run', (req, res) => {
  const { body, headers, url, method } = req.body;
  const startRequestTime = Date.now();
  const currentDate = moment(startRequestTime).format('ll');
  const dataToStore = { body, headers, url, method };
  const reqHeaders = headers;

  fs.readFile(path.resolve(dataPath), 'utf8', (err, data) => {
    if (err) throw err;
    const dataToWrite = JSON.parse(data);

    if (!dataToWrite[currentDate]) {
      dataToWrite[currentDate] = [];
    }

    dataToWrite[currentDate].push(dataToStore);
    const newDataStringified = JSON.stringify(dataToWrite);
    fs.writeFile(path.resolve(dataPath), newDataStringified, err => {
      if (err) throw err;
    });
  });

  axios({
    method,
    url,
    data: body,
    headers
  })
    .then(axiosResponse => {
      const endRequestTime = Date.now();
      const time = endRequestTime - startRequestTime;
      const temporaryHeaders = axiosResponse.config.headers;

      Object.keys(reqHeaders).forEach(key => {
        console.log('key', key);
        delete temporaryHeaders[key];
      });

      const { status, headers, data } = axiosResponse;
      const body = {
        status,
        headers,
        temporaryHeaders,
        data,
        time
      };
      return res.json(body);
    })
    .catch(err => {
      console.log('postaman/run error');
      const endRequestTime = Date.now();
      const time = endRequestTime - startRequestTime;
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
