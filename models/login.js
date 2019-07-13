const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const loginScema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "signUp"
  }
});

mongoose.model("login", loginScema, "login");
