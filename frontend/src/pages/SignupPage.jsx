import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // useEffect(() => {
  //   fetchUsers();
  // }, []);

  // const fetchUsers = () => {
  //   axios.get("http://localhost:3000/auth/register").then((res) => {
  //     // console.log(res.data)
  //   });
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/auth/register", {
        email,
        username,
        password,
      })
      .then(() => {
        alert("Registration Successful");
        setEmail("");
        setUsername("");
        setPassword("");
        // fetchUsers();
        navigate("/login");
      })
      .catch((error) => {
        console.log("Unable to register user");
      });
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#1a1a1a] text-white">
      <form
        className="bg-zinc-800 rounded-lg p-9 w-full max-w-lg"
        onSubmit={handleSubmit}
      >
        {/* Email Input */}
        <label>Email</label>
        <br />
        <input
          className="w-full h-10 rounded-xl bg-zinc-700 p-2 mt-1 mb-4"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
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
          Sign Up
        </button>
        <div className="mt-4">
          Have account?{" "}
          <Link className="text-cyan-300" to={"/login"}>
            {" "}
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
