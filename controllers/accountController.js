const express = require("express");
const app = express();
const User = require("../models/user");
const Account = require("../models/account");

// app.post('/getAccount', async (req, res) => {
exports.getAccount = async (req, res) => {
  console.log(req.body);
  User.findByPk(req.session.user.id, { include: { model: Account } })
    .then((user) => {
      console.log(user);
      user
        .getAccounts({ where: { id: req.body.accountId } })
        .then((accounts) => {
          console.log(accounts);
          res.status(200).send(JSON.stringify(accounts));
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((error) => console.log(error));
};
// });

exports.openAccount = async (req, res) => {
  console.log(req.body);
  User.findByPk(req.session.user.id, { include: { model: Account } })
    .then((user) => {
      console.log(user);
      Account.create({
        name: req.body.accountName,
        balance: 0,
        userId: user.id,
      })
        .then((account) => {
          console.log(account);
          req.session.successMessage =
            "New Account Opened - Account ID - " + account.id;
          res.redirect("/home");
        })
        .catch((err) => console.log(err));
    })
    .catch((error) => console.log(error));
};

//app.post("/pay", async (req, res) => {
exports.pay = (req, res) => {
  console.log(req.body);
  let params = {};
  let payeeAccountID = req.body.payeeAccountID;
  let senderAccountID = req.body.senderAccountID;
  let transactionAmount = parseInt(req.body.payAmount);
  params.senderAccountID = senderAccountID;
  if (payeeAccountID == null) {
    res.render("home/pay.ejs", params);
  } else {
    Account.findByPk(parseInt(senderAccountID))
      .then((payerAccount) => {
        if (payerAccount.balance >= transactionAmount || req.session.isAdmin) {
          Account.findByPk(payeeAccountID)
            .then((payeeAccount) => {
              payeeAccount.balance += transactionAmount;
              if (!req.session.isAdmin) {
                payerAccount.balance -= transactionAmount;
              }
              payeeAccount
                .save()
                .then((recepientAccount) => {
                  console.log(recepientAccount);
                  if (!req.session.isAdmin) {
                    payerAccount.save().then((senderAccount) => {
                      console.log(senderAccount);
                      params.successMessage =
                        "Sent " +
                        transactionAmount +
                        " YOMs from " +
                        senderAccount.id +
                        " to " +
                        recepientAccount.id;
                      res.render("home/pay.ejs", params);
                    });
                  } else {
                    params.successMessage =
                      "Sent " +
                      transactionAmount +
                      " YOMs from " +
                      payerAccount.id +
                      " to " +
                      recepientAccount.id;
                    res.render("home/pay.ejs", params);
                  }
                })
                .catch((receiveError) => {
                  console.log(receiveError);
                  params.errorMessage =
                    "Failed to Credit Recepient Account " + payeeAccount.id;
                  res.render("home/pay.ejs", params);
                });
            })
            .catch((payeeError) => {
              console.log(payeeError);
              params.errorMessage =
                "Failed to Debit Sender Account " + payeeAccount.id;
              res.render("home/pay.ejs", params);
            });
        } else {
          console.log("Insufficient YOMs");
          params.errorMessage = "Insufficient YOMs";
          res.render("home/pay.ejs", params);
        }
      })
      .catch((payerError) => {
        console.log(payerError);
        params.errorMessage = "Cound Not Find Account " + senderAccountID;
        res.render("home/pay.ejs", params);
      });
  }
};
//});
