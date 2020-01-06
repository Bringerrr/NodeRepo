const express = require("express");
const bodyParser = require("body-parser");
const sql = require("./routes/sql");
const cors = require("cors");

const app = express();
const port = 4004;

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/sql", sql);

const server = app.listen(port, () => {
  console.log(`SQL server started at ${port}`);
});
