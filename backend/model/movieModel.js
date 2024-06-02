const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: { type: String, required: true },
  type: { type: String, required: true },
  poster: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
