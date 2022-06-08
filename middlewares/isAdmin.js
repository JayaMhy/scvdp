module.exports = (req, res, next) => {
  if (req.session.user && req.session.user.admin) {
    console.log(req.session.user.admin);
    console.log("admin");
    return next();
  }
  res.redirect("/login");
};
