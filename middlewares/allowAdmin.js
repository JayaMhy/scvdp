module.exports = (req, res, next) => {
  if (req.session.user && req.session.user.admin) {
    return next();
  }
  res.redirect("/login");
};
