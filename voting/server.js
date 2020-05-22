const express = require('express');
const bodyParser = require('body-parser');
const voting = require('./routes/voting');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 4001;

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/voting', voting);

const server = app.listen(port, () => {
  console.log(`Voting server started at ${port}`);
});
