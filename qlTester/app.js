var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var graphqlHTTP = require("express-graphql");
var schema = require("./graphql/Schemas");
var cors = require("cors");
const passport = require("passport");


mongoose
  .connect("mongodb://localhost/gql_tester", {
    promiseLibrary: require("bluebird"),
    useNewUrlParser: true,
  })
  .then(() => console.log("connection successful"))
  .catch((err) => console.error(err));


// // Must first load the models
// require('./models/user');

// Pass the global passport object into the configuration function
require('./config/passport')(passport);

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use( cors());
app.use(
  "/graphql",
  cors(),
  passport.authenticate("jwt", { session: false }),
  // (req,res)=>{
  //   console.log(req.body)
  (graphqlHTTP({
      schema: schema,
      rootValue: global,
      graphiql: true,
    }))
  //   (req,res)
  // }
);
// let allowCrossDomain = function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', "*");
//   res.header('Access-Control-Allow-Headers', "*");
//   next();
// }
// app.use(allowCrossDomain);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
