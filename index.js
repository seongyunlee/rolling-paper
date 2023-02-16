const express = require("express");
const http = require("http");
const https = require("https");
const app = express();
const app2 = express();
const fs = require("fs");
const path = require("path");
const server = http.createServer(app2);
const { MongoClient, ServerApiVersion } = require("mongodb");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const configJson = require("./config.json");

const credentials = {
  key: fs.readFileSync("./etc/kkrupp.site/private.key"),
  cert: fs.readFileSync("./etc/kkrupp.site/certificate.crt"),
  ca: fs.readFileSync("./etc/kkrupp.site/ca_bundle.crt"),
};

const httpsServer = https.createServer(credentials, app);

exports.mongo = new MongoClient(configJson.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

var sessionStore = new MySQLStore(configJson.sql);

app.use(
  session({
    secret: configJson.sessionSecret,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365,
    },
  })
);

const indexRouter = require("./router/index");
const createRouter = require("./router/create");
const paperRouter = require("./router/paper");
const userRouter = require("./router/user");

app.use(express.static(path.join(__dirname, "static")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", indexRouter);
app.use("/create", createRouter);
app.use("/paper", paperRouter);
app.use("/user", userRouter);

app2.use((req, res) => {
  console.log(req.url);
  res.redirect(`https://${configJson.domain}${req.url}`);
});

var port = 80;

server.listen(port, function () {
  console.log("server on! http://localhost:" + port);
});

httpsServer.listen(443, function () {
  console.log("server on! https://localhost:" + 443);
});
