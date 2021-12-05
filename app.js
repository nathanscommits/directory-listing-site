const express = require("express");
const app = express();
// const secure = require('ssl-express-www');

// const cookieParser = require("cookie-parser");
// var bodyParser = require("body-parser");
// app.use(cookieParser());
// app.use(bodyParser.json()); // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// app.use(secure);

app.set('subdomain offset', 0);
app.set("views", "views");
app.set("view engine", "ejs");
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
const router = require("./router");
app.use(express.static("public"));
app.use(express.json());
app.use("/", router);
const server = require("http").createServer(app);

module.exports = server;
