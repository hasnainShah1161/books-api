const express = require("express");
const routes = express.Router();
const mongoose = require("mongoose");
const SignUp = mongoose.model("signUp");

routes.post("/signup", async (req, res) => {
    var signUpUserNewUser = new SignUp({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        email: req.body.email,
        phone: req.body.phone,
        dob: req.body.dob,
        cnic: req.body.cnic
      }); 
  try {
    if (req.body.password === req.body.confirmPassword) {
      const signUpUser = await signUpUserNewUser.save();
      res.json(signUpUser);
    } else {
      res.json({
        status: "ERROR",
        message: "password does not match",
        errors: {
          err: err
        }
      });
    }
  } catch (err) {
    res.json({
      status: "ERROR",
      message: "Some Error occured",
      errors: {
        err: err
      }
    });
  }
});

module.exports = routes;
