const express = require('express');
const bodyParser = require('body-parser');
const form = require('./routes/form');
const voting = require('./routes/voting');
const cors = require('cors');

const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use(cors());

app.use(bodyParser.json());
app.use('/form', form);
app.use('/voting', voting);

const server = app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
