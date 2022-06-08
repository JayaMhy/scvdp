const { Blockchain } = require("../blockchain");

exports.getLead = async function (req, res) {
  // call to BC function
  await Blockchain.methods.getResults(1234).call(function (error, result) {
    console.log(result);
    // console.log(typeof result);
    const result_dummy = [
      { 0: "false", 1: "2022-06-08 15:20:09", 2: "47.4" },
      { 0: "true", 1: "2022-06-08 20:20:09", 2: "47.5" },
    ];
    res.render("lead.html", { result_dummy });
  });
  // returned output array
  console.log("The output");
  // pass the output to the template
};
