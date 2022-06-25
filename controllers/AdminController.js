const { Blockchain } = require("../blockchain");

exports.getAdmin = function (req, res) {
  res.render("admin.html");
};

exports.postAddUser = async function (req, res) {
  console.log("I'm in post add user");
  const { role, id, name, blockchain_address, joining_date } = req.body;

  // console.log(req.body);

  // console.log(role, id, name, blockchain_address, joining_date);

  if (role == "developer") {
    await Blockchain.methods
      .addDeveloper(blockchain_address, id, name, joining_date)
      .send({
        from: "0xE6B655A7AcD63f38f1c884bE364c9499f5C27dEC",
        // gas: "6721975",
      });
    return res.json({ success: true });
  } else if (role == "lead_developer") {
    await Blockchain.methods
      .addLeadDeveloper(blockchain_address, id, name, joining_date)
      .send({
        from: "0xE6B655A7AcD63f38f1c884bE364c9499f5C27dEC",
        // gas: "6721975",
      });
    return res.json({ success: true });
  } else {
    return res.json({ success: false });
  }
};
