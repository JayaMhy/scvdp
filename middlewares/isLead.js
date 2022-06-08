module.exports = (req, res, next) => {
  if (req.session.user && req.session.user.lead) {
    console.log("lead");
    return next();
  }
  res.redirect("/login");
};
