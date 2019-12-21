const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const dataPath = './assets/vote/data.json';
const dataPathXml = './assets/vote/data.xml';
const dataPathHtml = './assets/vote/data.html';

const userIsExist = (data, user) => {
  return data.some(element => {
    console.log(' check user existance', element.whoVoted[user], 'user', user);
    return element.whoVoted[user] === true;
  });
};

router.get('/variants', (req, res) => {
  fs.readFile(path.resolve(dataPath), 'utf8', (err, data) => {
    if (err) throw err;
    return res.json(JSON.parse(data));
  });
});

router.get('/download', (req, res) => {
  const { accept } = req.headers;

  console.log('accept', accept);
  let fileToDownload;

  switch (accept) {
    case 'text/html':
      fileToDownload = dataPathHtml;
      break;

    case 'text/json':
      fileToDownload = dataPath;
      break;

    case 'application/xml':
      fileToDownload = dataPathXml;
      break;

    default:
      break;
  }

  res.sendFile(path.resolve(fileToDownload));
});

router.put('/vote', (req, res) => {
  const newData = req.body;

  const { username, id } = newData;

  fs.readFile(path.resolve(dataPath), 'utf8', (err, data) => {
    if (err) throw err;
    const dataToWrite = JSON.parse(data);

    const answerIndex = dataToWrite.findIndex(element => {
      return element.id == id;
    });

    if (!userIsExist(dataToWrite, username)) {
      dataToWrite[answerIndex].count += 1;
      dataToWrite[answerIndex].whoVoted[username] = true;
    }

    const newDataStringified = JSON.stringify(dataToWrite);
    const newDataHtml = `
    <html>${JSON.stringify(dataToWrite)}</html>
    `;
    const newDataXml = `
    <vote><variants>${JSON.stringify(dataToWrite)}</variants>/vote>
    `;

    fs.writeFile(path.resolve(dataPath), newDataStringified, err => {
      if (err) throw err;

      fs.writeFile(path.resolve(dataPathHtml), newDataHtml, err => {
        if (err) throw err;
      });

      fs.writeFile(path.resolve(dataPathXml), newDataXml, err => {
        if (err) throw err;
      });

      return res.status(200).json(dataToWrite);
    });
  });
});

router.post('/reg', (req, res) => {
  const { username } = req.body;

  fs.readFile(path.resolve(dataPath), 'utf8', (err, data) => {
    if (err) throw err;

    const dataToWrite = JSON.parse(data);

    if (!userIsExist(dataToWrite, username)) {
      return res.status(200).json('success');
    } else {
      return res.status(400).json('user already exists');
    }
  });
});

module.exports = router;
