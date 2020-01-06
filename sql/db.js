const Sequelize = require("sequelize");
const sequelize = new Sequelize("sammy", "sammy", "8588057e", {
  dialect: "postgres",
  host: "46.101.143.191"
});

module.exports = sequelize;
