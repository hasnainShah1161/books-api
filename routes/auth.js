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
              token: token
            });
          } else {
            res.json({
              success: false,
              message: "Incorrect username or password"
            });
          }
        } else {
          res.json({
            success: false,
            message: "Authentication failed! Please check the request"
          });
        }
      })
      .catch(err => {
        res.json({ message: err });
      });

    // For the given email fetch user from DB
    // let mockedemail = "admin";
    // let mockedPassword = "password";

    // if (email && password) {
    //   if (email === mockedemail && password === mockedPassword) {
    //     // let token = jwt.sign({ email: email }, config.secret, {
    //     //   expiresIn: "24h" // expires in 24 hours
    //     // });
    //     // return the JWT token for the future API calls
    //     // res.json({
    //     //   success: true,
    //     //   message: "Authentication successful!",
    //     //   token: token
    //     // });
    //   } else {
    //     res.sendStatus(403).json({
    //       success: false,
    //       message: "Incorrect username or password"
    //     });
    //   }
    // } else {
    //   res.sendStatus(400).json({
    //     success: false,
    //     message: "Authentication failed! Please check the request"
    //   });
    // }
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
