const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
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
require("./models/genres");

// importing routes
const booksRoutes = require("./routes/books");
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true
  })
  .then(() => console.log("mongo db is connect"))
  .catch(err => console.log(err));
var db = mongoose.connection;

// routes middleware

app.use("/books", booksRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("App is running on the port : " + port);
});
