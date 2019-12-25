const express = require('express');
const bodyParser = require('body-parser');
const postman = require('./routes/postman');
const cors = require('cors');
const app = express();
const port = 4002;

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/postman', postman);

const server = app.listen(port, () => {
  console.log(`Postman server started at ${port}`);
});
