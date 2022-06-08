const { USERS } = require("../constants");

exports.postLogin = function (req, res) {
  const { user_id, password } = req.body;
  // Check if user exists
  if (!(user_id in USERS)) {
    return res.send({
      success: false,
      message: "User not found",
    });
  }

  // Check if password is correct
  if (USERS[user_id].password !== password) {
    return res.send({
      success: false,
      message: "Wrong password",
    });
  }
  req.session.user_id = user_id;

  // Check if user is admin
  if (USERS[user_id].admin) {
    req.session.user = {
      user_id,
      admin: true,
    };
    res.redirect("/admin");
  }
  if (USERS[user_id].lead) {
    req.session.user = {
      user_id,
      lead: true,
    };
    res.redirect("/lead");
  } else {
    req.session.user = {
      user_id,
      lead: false,
    };
    res.redirect("/");
  }
};

exports.getLogin = function (req, res) {
  res.render("login.html");
};

exports.getLogout = function (req, res) {
  {
    req.session.destroy();
    res.redirect("/");
  }
};
