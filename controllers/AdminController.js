const { Blockchain } = require("../blockchain");

exports.getAdmin = function (req, res) {
  res.render("admin.html");
};

exports.postAddUser = async function (req, res) {
  const { role, id, name, blockchain_address, joining_date } = req.body;
  if (role == "developer") {
    await scvContract.methods
      .addDeveloper(blockchain_address, id, name, joining_date)
      .send({
        from: "0x0bbfc02B8a7824a4feF745641aC28E3Cbd3052C0",
      });
    return res.json({ success: true });
  } else if (role == "lead_developer") {
    await scvContract.methods
      .addLeadDeveloper(blockchain_address, id, name, joining_date)
      .send({
        from: "0x0bbfc02B8a7824a4feF745641aC28E3Cbd3052C0",
      });
    return res.json({ success: true });
  } else {
    return res.json({ success: false });
  }
};
