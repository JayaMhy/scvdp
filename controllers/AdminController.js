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
        from: "0x7e84752e96Cb536fa81aA31f9966FF4f0CE132C8",
      });
    return res.json({ success: true });
  } else if (role == "lead_developer") {
    await scvContract.methods
      .addLeadDeveloper(blockchain_address, id, name, joining_date)
      .send({
        from: "0x7e84752e96Cb536fa81aA31f9966FF4f0CE132C8",
      });
    return res.json({ success: true });
  } else {
    return res.json({ success: false });
  }
};
