import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/auth/login", {
        username,
        password,
      });
      const token = response.data.token;
      const userId = response.data.user._id;
      alert("Login successful");
      setUsername("");
      setPassword("");
      navigate(`/home`);
      window.location.reload();
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId); // Store user ID
    } catch (error) {
      console.log("Login Error", error);
    }
  };

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center bg-[#1a1a1a] text-white">
        <form
          className="bg-zinc-800 rounded-lg p-9 w-full max-w-lg"
          onSubmit={handleLogin}
        >
          {/* Username Input */}
          <label>Username</label>
          <br />
          <input
            className="w-full h-10 rounded-xl bg-zinc-700 p-2 mt-1 mb-4"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {/* Password Input */}
          <label>Password</label>
          <br />
          <input
            className="w-full h-10 rounded-xl bg-zinc-700 p-2 mt-1 mb-4"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* Button */}
          <button
            className="w-full h-12 border hover:bg-teal-900 mt-4"
            type="submit"
          >
            Login
          </button>
          <div className="mt-4">
            Don't have account?{" "}
            <Link className="text-cyan-300" to={"/signup"}>
              {" "}
              SignUp
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
