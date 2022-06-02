const express = require("express");
const axios = require("axios");
const multer = require("multer");
const FormData = require("form-data");
const app = express();
const fs = require("fs");
const path = require("path");
const nunjucks = require("nunjucks");
// const s = require("web3");

nunjucks.configure("client", {
  autoescape: true,
  express: app,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(__dirname + "/client/"));
app.use(express.static(__dirname + "/client/static"));
app.use(express.static(__dirname + "/build/"));
// app.use(express.static(__dirname + "/client/"));
// app.use(express.static(__dirname + "/client"));

// Express Middleware for serving static files
// app.use(express.static(path.join(__dirname, "client/")));
//app.use(express.static("client/public/"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const session = require("express-session");
app.use(
  session({
    secret: "do3884c3n440-n04003c230--0",
    resave: false,
    saveUninitialized: false,
  })
);

const PORT = 3000;
const PYTHON_BASE_URL = "http://127.0.0.1:5000";

async function sendHomePage(req, res) {
  res.render("index.html");
}

const upload = multer({ dest: "uploads/" });

async function handlePostData(req, res) {
  try {
    //Save file
    const file = req.file;
    const url = PYTHON_BASE_URL + "/predict";
    //send file to python
    const formData = new FormData();
    formData.append("file", fs.createReadStream(file.path));
    formData.append("textname", req.body.textname);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    console.log(formData);

    const response = await axios.post(url, formData, config);
    //save response
    req.session.dev_id = response.data.developer_id;
    req.session.responseData = response.data;

    console.log(response.data);
    //send response to client
    res.redirect("/result");
  } catch (error) {
    console.log(error, "ERROR");
    res.send({
      success: false,
      message: "Sending file to python backend failed",
    });
  }
}

async function displayResult(req, res) {
  const result = req.session.responseData;
  res.render("result.html", { result });
}

app.get("/", sendHomePage);
app.post("/upload", upload.single("file"), handlePostData);
app.get("/result", displayResult);
//start server and log message

app.get("/admin", (req, res) => {
  res.render("blockchainadmin.html");
});

// app.get("/admin/index.js", function (req, res) {
//   res.sendFile(path.join(__dirname + "/client/index.js"));
// });

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
