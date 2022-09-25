const express = require("express");
const app = express();
const User = require("../models/user");

exports.login = async (req, res, next) => {
  // app.use('/', async (req, res, next) => {
  let name = req.body.username;
  let pass = req.body.password;
  try {
    let user = await User.findOne({
      where: {
        username: name,
        password: pass,
      },
    });
    let params = {};
    if (user != null) {
      params.username = name;
      req.session.userId = user.id;
      req.session.user = user;
      req.session.isAuth = true;
      if (user.id ==2) {
        req.session.isAdmin = true;
      }
      else {
        req.session.isAdmin = false;
      }
      res.redirect("/home");
    } else {
      req.session.isAuth = false;
      req.session.errorMessage = "Username/Password is Incorrect";
      res.redirect("/");
    }
  } catch (error) {
    console.log(error);
  }
};
// });

exports.logout = async (req, res, next) => {
  // app.use('/', async (req, res, next) => {
    req.session.user = null;
    req.session.isAuth = false;
    res.redirect("/");   
};
// });

exports.signUp = async (req, res, next) => {
  // app.use("/", async (req, res, next) => {
  let name = req.body.username;
  let pass = req.body.password;
  let confpass = req.body.confpassword;
  if (pass == confpass) {
    await User.create({
      username: name,
      password: pass,
    })
      .then((user) => {
        req.session.successMessage = "Registered Successfully";
        res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
        req.session.errorMessage = err.message;
        res.redirect("/");
      });
  } else {
    res.session.errorMessage = "Passwords do not match!";
    res.redirect("/");
  }
};
// });
