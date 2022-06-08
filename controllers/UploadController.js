const { PYTHON_BASE_URL } = require("../constants");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const { Blockchain } = require("../blockchain");

exports.postUpload = async function (req, res) {
  try {
    //Save file
    const file = req.file;
    const filePath = file["path"];
    const uploadTime = req.upload_time;

    const url = PYTHON_BASE_URL + "/predict";
    //send file to python
    const formData = new FormData();
    formData.append("file", fs.createReadStream(file.path));
    formData.append("dev_id", req.body.dev_id);

    const response = await axios({
      method: "post",
      url,
      data: formData,
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    //save response
    req.session.dev_id = response.data.developer_id;
    req.session.responseData = response.data;

    console.log(uploadTime, filePath, Blockchain);
    console.log(response.data);

    const {
      developer_id,
      filename,
      is_vulnerable,
      nonvulnerable_score,
      prediction_time,
      vulnerable_score,
    } = response.data;

    console.log(is_vulnerable);
    console.log(typeof is_vulnerable);

    await Blockchain.methods
      .workMlResult(
        1234,
        is_vulnerable.toString(),
        vulnerable_score.toString(),
        nonvulnerable_score.toString(),
        filename,
        prediction_time,
        prediction_time,
        "1234"
      )
      .send({
        // Blockchain Account Address
        from: "0xE6B655A7AcD63f38f1c884bE364c9499f5C27dEC",
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
  const result = req.session.responseData;
  res.render("result.html", { result });
};
