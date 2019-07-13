const express = require("express");
const routes = express.Router();
const bodyParser = require("body-parser");
let jwt = require("jsonwebtoken");
let config = require("../config");
let middleware = require("../middleware");
const mongoose = require("mongoose");
const SignUp = mongoose.model("signUp");

class HandlerGenerator {
  login(req, res) {
    console.log("req.....", req.body);
    SignUp.findOne({
      email: req.body.email,
      password: req.body.password
    })
      .then(user => {
        console.log(user);
        if (req.body.email && req.body.password) {
          console.log("first If...", req.body.email);
          if (user.email && user.password) {
            let token = jwt.sign({ user }, config.secret, {
              expiresIn: "24h" // expires in 24 hours
            });
            console.log("token....", token);
            res.json({
              success: true,
              message: "Authentication successful!",
              isAuthenticated: true,
              token: token
            });
          } else {
            res.json({
              success: false,
              isAuthenticated: false,
              message: "Incorrect username or password"
            });
          }
        } else {
          res.json({
            success: false,
            isAuthenticated: false,
            message: "Authentication failed! Please check the request"
          });
        }
      })
      .catch(err => {
        res.json({ message: err });
      });

  }
  index(req, res) {
    res.json({
      success: true,
      message: "Index page"
    });
  }
}

const handlers = new HandlerGenerator();

routes.post("/login", handlers.login);
routes.get("/", middleware.checkToken, handlers.index);

module.exports = routes;
