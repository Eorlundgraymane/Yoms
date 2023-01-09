const { Sequelize } = require("sequelize");

// const database = new Sequelize("yoms", "root", "password", {
//   dialect: "mysql",
//   host: "localhost",
// });

const database = new Sequelize(
  "bpwty1l8ms0cedsiuigp",
  "u8vo4bnhk3m1bs0e",
  "SFL3b3yoRoGBX5YgSnbz",
  {
    dialect: "mysql",
    host: "bpwty1l8ms0cedsiuigp-mysql.services.clever-cloud.com",
    port: 3306,
  }
);

module.exports = database;
