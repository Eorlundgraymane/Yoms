const User = require("../models/user");
const Account = require("../models/account");

exports.getHomePage = async (req, res, next) => {
  if (req.session.isAuth) {
    let user = req.session.user;
    user = await User.findByPk(req.session.user.id, {
      include: { model: Account },
    });
    let params = {};
    params.user = user;
    if (req.session.errorMessage != undefined) {
      params.errorMessage = req.session.errorMessage;
    }
    if (req.session.successMessage != undefined) {
      params.successMessage = req.session.successMessage;
    }
    console.log(user);
    params.senderAccountID = user.id;
    res.render("home/index.ejs", params);
  } else {
    next();
  }
};
