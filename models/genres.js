const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const genresSchema = new Schema({});

mongoose.model("genres", genresSchema);
