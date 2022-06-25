const { number } = require("nunjucks/src/tests");
const { Blockchain } = require("../blockchain");
const { create } = require("ipfs-http-client");
const fs = require("fs");
const request = require("request");
// const requ = require('request');

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

  var result = [];
  var filehash = "";
  await Blockchain.methods
    .getMlResultBySerialNo(serial_no)
    .call(function (error, res) {
      console.log("RES", res);

      result = formatResult(res);
      //res.render("view.html", { result });
    });

  await Blockchain.methods
    .getResultByMlSerialNo(serial_no)
    .call(function (error, result) {
      console.log("IPFS hash", result);
      filehash = result;
    });

  res.render("view.html", { result, filehash });
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

//function to save file in ipfs
exports.saveFileToIpfs = async function (req, res) {
  const filePath = req.body.filepath;
  const filehash = await saveFile(filePath);

  const { serial_no } = req.params;
  const ml_serial_no = serial_no;
  const astatus = true;
  const lead_developer_id = req.session.user.user_id;
  const stimestamp = Math.floor(new Date().getTime() / 1000);

  console.log("--------------------------------------");
  console.log(ml_serial_no, lead_developer_id, stimestamp);
  fs.unlink(filePath, (err) => {
    if (err) console.log(err);
  });

  await Blockchain.methods
    .reviewResulttoBC(
      ml_serial_no,
      astatus,
      stimestamp,
      lead_developer_id,
      filehash.toString()
    )
    .send({
      // Blockchain Account Address
      from: "0xE6B655A7AcD63f38f1c884bE364c9499f5C27dEC",
      gas: "6721975",
    });

  res.redirect("/lead/");
};

//Function to show code in modal
exports.getCode = async function (req, res) {
  const { filehash } = req.params;

  console.log(filehash);

  const url = "http://127.0.0.1:8080/ipfs/" + filehash;

  console.log(url);

  request(url, function (err, response, body) {
    if (err) {
      console.log(err);
    } else {
      res.json({ code: body });
    }
  });
};
