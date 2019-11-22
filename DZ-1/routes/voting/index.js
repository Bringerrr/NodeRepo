const express = require('express');
const router = express.Router();
const path = require('path');
const dataPath = './assets/vote/data.json';
const fs = require('fs');

router.get('/variants', (req, res) => {
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) throw err;
    return res.json(JSON.parse(data));
  });
});

router.put('/vote', (req, res) => {
  const newData = req.body;
  const newDataStringified = JSON.stringify(newData);
  fs.writeFile(dataPath, newDataStringified, err => {
    if (err) throw err;
    return res.status(200).json(newData);
  });
});

module.exports = router;
