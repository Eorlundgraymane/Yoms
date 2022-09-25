const { data } = require("jquery");
const Sequelize = require("sequelize");
const database = require("../database/database");
const Account = require("./account");

const Transaction = database.define("transaction", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  creditorId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Account,
      key: "id",
    },
  },
  amount: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Transaction;
