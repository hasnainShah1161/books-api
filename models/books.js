const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const devicesSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  expirayDate: {
    type: Date
  },
  warranty: {
    type: String,
    required: true
  },
  cost: {
    type: String,
    required: true
  }
});

mongoose.model("devices", devicesSchema, "devices");
