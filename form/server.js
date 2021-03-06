const express = require('express');
const bodyParser = require('body-parser');
const form = require('./routes/form');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.set('view engine', 'pug');
app.set('views', path.resolve(__dirname + '/assets/', 'templates'));

app.use('/form', form);

app.get('/', (req, res) => {
  res.redirect('/form');
});

const server = app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
