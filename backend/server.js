const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const Movie = require("./model/movieModel");
const User = require("./model/userModel");
const path = require("path");
const app = express();
app.use(cors());
dotenv.config();

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());

const __dirnames = path.resolve();

// Routes
app.use("/auth", authRoutes);

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.post("/auth/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1hr",
    });
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
});
app.post("/users/:userId/favorites", async (req, res) => {
  const { userId } = req.params;
  const { movie } = req.body;

  console.log(movie.title);
  if (!movie.title || !movie.year || !movie.type || !movie.poster) {
    return res.status(400).json({ error: "Missing movie data" });
  }

  try {
    const newMovie = new Movie({ ...movie, userId });
    await newMovie.save();

    const user = await User.findById(userId);
    if (!user) {
      console.error(`User with id ${userId} not found`);
      return res.status(404).json({ error: "User not found" });
    }

    user.favoriteMovies.push(newMovie._id);
    await user.save();

    res.status(201).json({ movie: newMovie });
  } catch (error) {
    console.error("Error adding favorite movie:", error);
    res.status(500).json({ error: "Error adding favorite movie" });
  }
});

app.get("/users/:userId/favorites", authenticateToken, async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate("favoriteMovies");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ favoriteMovies: user.favoriteMovies });
  } catch (error) {
    console.error("Error fetching favorite movies:", error);
    res.status(500).json({ error: "Error fetching favorite movies" });
  }
});

app.delete("/users/:userId/favorites/:movieId", async (req, res) => {
  const { userId, movieId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    user.favoriteMovies = user.favoriteMovies.filter(
      (movie) => movie._id.toString() !== movieId
    );

    await user.save();

    res.status(200).send("Favorite movie deleted");
  } catch (error) {
    console.error("Error deleting favorite movie", error);
    res.status(500).send("Server error");
  }
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirnames, "/frontend/dist")));

  // react app
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirnames, "frontend", "dist", "index.html"));
  });
}
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
