const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const booksSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  genres: {
    type: String,
    required: true
  },
  publisher: {
    type: String,
    required: true
  },
  publication_date: {
    type: Date
  },
  pages: {
    type: String,
    required: true
  },
  rank: {
    type: String
  },
  author: {
    type: String,
    required: true 
  },
  about_author: { 
    type: String
  },
  image: {
    type: String,
    required: true
  },
  videoUrl: {
    type: String
  }
});

mongoose.model("books", booksSchema, "books");
