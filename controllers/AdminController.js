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
        from: "0xcF5fA0Be2c985edECAaa13EA861fc96E8bDf30bB",
      });
    return res.json({ success: true });
  } else if (role == "lead_developer") {
    await scvContract.methods
      .addLeadDeveloper(blockchain_address, id, name, joining_date)
      .send({
        from: "0xcF5fA0Be2c985edECAaa13EA861fc96E8bDf30bB",
      });
    return res.json({ success: true });
  } else {
    return res.json({ success: false });
  }
};
