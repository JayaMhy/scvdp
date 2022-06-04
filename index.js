const express = require("express");
const axios = require("axios");
const multer = require("multer");
const FormData = require("form-data");
const app = express();
const fs = require("fs");
const path = require("path");
const nunjucks = require("nunjucks");
const cookieParser = require("cookie-parser");
const session = require("express-session");

nunjucks.configure("views", {
  autoescape: true,
  express: app,
  watch: true,
  noCache: true,
});

const { USERS, PYTHON_BASE_URL, PORT } = require("./constants");
const allowAdmin = require("./middlewares/allowAdmin");

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/client/"));
app.use(express.static(__dirname + "/bower_components/"));

app.use(
  session({
    secret: "do3884c3n440-n04003c230--0",
    resave: false,
    saveUninitialized: false,
  })
);
//midleware for session
app.use((req, res, next) => {
  console.log(req.session, "SESSIOn");
  res.locals.user = req.session.user;
  next();
});

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

    // console.log(formData);

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

app.get("/", (req, res) => {
  res.render("index.html");
});
app.post("/upload", upload.single("file"), handlePostData);
app.get("/result", (req, res) => {
  const result = req.session.responseData;
  res.render("result.html", { result });
});

app.get("/login", (req, res) => {
  res.render("login.html");
});

app.post("/login", (req, res) => {
  const { user_id, password } = req.body;
  // Check if user exists
  if (!(user_id in USERS)) {
    return res.send({
      success: false,
      message: "User not found",
    });
  }

  // Check if password is correct
  if (USERS[user_id].password !== password) {
    return res.send({
      success: false,
      message: "Wrong password",
    });
  }
  req.session.user_id = user_id;

  // Check if user is admin
  if (USERS[user_id].admin) {
    req.session.user = {
      user_id,
      admin: true,
    };
    res.redirect("/admin");
  } else {
    req.session.user = {
      user_id,
      admin: false,
    };
    res.redirect("/");
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

app.get("/admin", allowAdmin, (req, res) => {
  res.render("admin.html");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
