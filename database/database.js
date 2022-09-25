const { Sequelize } = require("sequelize");

const database = new Sequelize("yoms", "root", "password", {
  dialect: "mysql",
  host: "localhost",
});

// const database = new Sequelize(
//   "nbe99yqsi9eiud3b",
//   "b2ylht4sdgnmtezj",
//   "t632xxu78ymv59jj",
//   {
//     dialect: "mysql",
//     host: "r98du2bxwqkq3shg.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
//     port: 3306,
//   }
// );

module.exports = database;
