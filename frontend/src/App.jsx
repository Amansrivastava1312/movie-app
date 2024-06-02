import { useState } from "react";

import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import FavouriteMovies from "./components/FavouriteMovie";

function App() {
  const isUserSignedIn = !!localStorage.getItem("token");

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {isUserSignedIn && <Route path="/home" element={<HomePage />} />}
        <Route path="/favorites" element={<FavouriteMovies />} />
      </Routes>
    </div>
  );
}

export default App;
