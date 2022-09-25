const User = require("../models/user");
const Account = require("../models/account");
const Transaction = require("../models/transaction");

User.hasMany(Account);
Account.belongsTo(User);
Account.hasMany(Transaction, { foreignKey: "debtorId" });

module.exports = this;
