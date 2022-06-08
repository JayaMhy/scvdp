const express = require("express");
const multer = require("multer");
const app = express();
const nunjucks = require("nunjucks");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const upload = multer({ dest: "uploads/" });

//Controllers
const AuthController = require("./controllers/AuthController");
const UploadController = require("./controllers/UploadController");
const AdminController = require("./controllers/AdminController");
const HomeController = require("./controllers/HomeController");
const LeadController = require("./controllers/LeadController");

//configure view engine
nunjucks.configure("views", {
  autoescape: true,
  express: app,
  watch: true,
  noCache: true,
});

const { PORT } = require("./constants");
const isAdmin = require("./middlewares/isAdmin");
const isLead = require("./middlewares/isLead");

app.use(cookieParser());
app.use(express.json());
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
  res.locals.user = req.session.user;
  next();
});

function logUploadTime(req, res, next) {
  req.upload_time = new Date();
  next();
}

// -------------------- ROUTES --------------------- //
app.get("/", HomeController.getHome);

app.post(
  "/upload",
  logUploadTime,
  upload.single("file"),
  UploadController.postUpload
);
app.get("/result", UploadController.getResult);

app.get("/login", AuthController.getLogin);
app.post("/login", AuthController.postLogin);
app.get("/logout", AuthController.getLogout);

app.get("/admin", isAdmin, AdminController.getAdmin);
app.get("/lead", isLead, LeadController.getLead);
// app.render("lead.html");

const start = async (err) => {
  // const Blockchain = new web3.eth.Contract(
  //   artifacts.abi,
  //   "0xD4E71357A312AaA94ed89aFAD31786a0a69A0855"
  // );
  // console.log("Hello blockchain", Blockchain);

  // const accounts = await web3.eth.getAccounts();
  // const lms = await LMS.deployed();
  // console.log("Accounts", accounts);
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};

start();
