const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const signUpUser = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  cnic: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  phone: {
    type: String,
    required: true
  }, 
  password: {
    type: String,
    required: true
  },
  confirmPassword: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

mongoose.model("signUp", signUpUser);
