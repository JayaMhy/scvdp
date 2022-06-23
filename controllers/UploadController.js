const { PYTHON_BASE_URL } = require("../constants");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const { Blockchain } = require("../blockchain");

exports.postUpload = async function (req, res) {
  try {
    //Save file
    const file = req.file;
    const file_path = file["path"];
    //'2022-06-10 15:31:03',

    const utimestamp = req.utimestamp;

    const url = PYTHON_BASE_URL + "/predict";
    //send file to python
    const form_data = new FormData();
    form_data.append("file", fs.createReadStream(file.path));
    form_data.append("dev_id", req.body.dev_id);

    const response = await axios({
      method: "post",
      url,
      data: form_data,
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    //save response
    req.session.dev_id = response.data.developer_id;
    req.session.result = response.data;

    console.log(utimestamp, file_path);
    console.log(response.data);

    const {
      developer_id,
      filename,
      is_vulnerable,
      nonvulnerable_score,
      ptimestamp,
      vulnerable_score,
    } = response.data;

    console.log(is_vulnerable);
    console.log(typeof is_vulnerable);

    await Blockchain.methods
      .addMlResult(
        is_vulnerable.toString(),
        vulnerable_score.toString(),
        nonvulnerable_score.toString(),
        filename,
        ptimestamp,
        utimestamp,
        file_path,
        developer_id
      )
      .send({
        // Blockchain Account Address
        from: "0xcF5fA0Be2c985edECAaa13EA861fc96E8bDf30bB",
        gas: "6721975",
      });

    //send response to client
    res.redirect("/result");
  } catch (error) {
    console.log(error, "ERROR");
    res.send({
      success: false,
      message: "Sending file to python backend failed",
    });
  }
};

exports.getResult = function (req, res) {
  const result = req.session.result;
  res.render("result.html", { result });
};

//rough
// exports.getMlResultBySerialNo = async function (req, res) {
//   //:serial_no/
//   const { serial_no } = req.params;
//   await Blockchain.methods
//     .getMlResultBySerialNo(Number(serial_no) - 1)
//     .call(function (error, result) {
//       console.log("RES", result);
//       if (result[1] == "") {
//         return res.redirect("/lead");
//       }
//       result = formatResult(result);
//       res.render("result.html", { result });
//     });
