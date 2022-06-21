const { number } = require("nunjucks/src/tests");
const { Blockchain } = require("../blockchain");
const { create } = require("ipfs-http-client");
const fs = require("fs");

// IPFS setup
async function ipfsClient() {
  const ipfs = await create({
    host: "0.0.0.0",
    port: 5001,
    protocol: "http",
  });
  return ipfs;
}

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

//IPFS

async function saveFile(filePath) {
  let ipfs = await ipfsClient();

  let data = fs.readFileSync(filePath);
  let options = {
    warpWithDirectory: false,
    progress: (prog) => console.log(`Saved :${prog}`),
  };
  const { cid } = await ipfs.add(data, options);
  console.log(cid);
  return cid;
}

exports.saveFileToIpfs = async function (req, res) {
  const filePath = req.body.filepath;

  const fileHash = await saveFile(filePath);

  fs.unlink(filePath, (err) => {
    if (err) console.log(err);
  });
  res.render("ipfs.html", { fileHash });
};
