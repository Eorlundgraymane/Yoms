exports.getLandingPage = (req, res, next) => {
  let params = {};
  if (!req.session.isAuth) {
      if (req.session.errorMessage != undefined) {
        params.errorMessage = req.session.errorMessage;
      }
      if (req.session.successMessage != undefined) {
        params.successMessage = req.session.successMessage;
      }
      req.session.errorMessage = null;
      req.session.successMessage = null;
      res.render("landing/index.ejs", params);
  }
  else {
    res.redirect('/home');
  }
};
