const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
require("dotenv/config");

// importin cors
const cors = require("cors");

//enables cors
app.use(
  cors({
    allowedHeaders: ["sessionId", "Content-Type"],
    exposedHeaders: ["sessionId"],
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false
  })
);
// bodyParser middleware
app.use(bodyParser.json());

//load models
require("./models/books");
require("./models/signUp");
require("./models/login");

// importing routes
const booksRoutes = require("./routes/books");
const userSignUp = require("./routes/signUp");
const auth = require("./routes/auth");
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true
  })
  .then(() => console.log("mongo db is connect"))
  .catch(err => console.log(err));
// var db = mongoose.connection;

// routes middleware

app.use("/devices", booksRoutes);
app.use("/user", userSignUp);
app.use("/user", auth);

var server = app.listen(process.env.PORT || 5000, () => {
  var port = server.address().port;
  console.log("Express is working on port " + port);
});
