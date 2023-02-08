const express = require("express");
const http = require("http");
const app = express();
const path = require("path");
const server = http.createServer(app);
const { MongoClient, ServerApiVersion } = require("mongodb");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const configJson = require("./config.json");

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

var port = 80;

server.listen(port, function () {
  console.log("server on! http://localhost:" + port);
});
