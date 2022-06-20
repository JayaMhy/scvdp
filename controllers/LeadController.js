const { number } = require("nunjucks/src/tests");
const { Blockchain } = require("../blockchain");

function formatResult(result) {
  return {
    serial_no: result[0],
    is_vulnerable: result[1],
    vulnerable_score: result[2],
    nonvulnerable_score: result[3],
    filename: result[4],
    ptimestamp: new Date(result[5] * 1000).toLocaleString(),
    utimestamp: new Date(result[6] * 1000).toLocaleString(),
    filepath: result[7],
    developer_id: result[8],
  };
}

exports.getAllMlResult = async function (req, res) {
  await Blockchain.methods.getAllMlResult().call(function (error, results) {
    results = results ?? []; // if results is null, set it to empty array
    results = results.map((result) => formatResult(result));
    res.render("lead.html", { results });
  });
};

exports.getMlResultBySerialNo = async function (req, res) {
  const { serial_no } = req.params;
  console.log(serial_no);
  await Blockchain.methods
    .getMlResultBySerialNo(serial_no)
    .call(function (error, result) {
      console.log("RES", result);

      result = formatResult(result);
      res.render("view.html", { result });
    });
};

exports.myFunction = async function () {
  // alert("I am an alert box!");
  // console.log("store in IPFS");
};
