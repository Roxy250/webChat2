import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import bgVideo from "../assets/BG.mp4"; // Import your background video here
import toast, { Toaster } from "react-hot-toast";

export default function SignInSide() {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   axios
  //     .post("http://localhost:3000/api/user/login", userInfo)
  //     .then(async (response) => {
  //       if (response.data.success) {
  //         navigate("/home", { state: response.data.user });
  //         toast.success(response.data.message);
  //       } else {
  //         toast.error("Username or password incorrect. Please try again.");
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       toast.error("An error occurred. Please try again.");
  //     });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Check if any field is empty
    if (!userInfo.username || !userInfo.password || !userInfo.room_id) {
      toast.error("Please fill up all fields.");
      return;
    }
  
    axios
      .post("http://localhost:3000/api/user/login", userInfo)
      .then(async (response) => {
        if (response.data.success) {
          navigate("/home", { state: response.data.user });
          toast.success(response.data.message);
        } else {
          const errorMessage =
            response.data.message || "Username or password is wrong.";
          toast.error(errorMessage);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("An error occurred. Please try again.");
      });
  };
  
  

  const inputStyle = {
    display: "block",
    border: "none",
    height: "33px", // Adjusted height
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.4)",
    borderRadius: "3.35px", // Adjusted border radius
    padding: "0 6.67px", // Adjusted padding
    marginTop: "1.34px", // Adjusted margin
    fontSize: "12px", // Adjusted font size
    fontWeight: "200", // Adjusted font weight
    marginBottom: "10.68px",
  };

  const ButtonStyle = {
    width: "100%",
    backgroundColor: "#1976d2",
    border: "none",
    color: "#080710",
    padding: "10px 0", // Adjusted padding
    fontSize: "12px", // Adjusted font size
    fontWeight: "400", // Adjusted font weight
    borderRadius: "3.35px", // Adjusted border radius
    cursor: "pointer",
    marginTop: "24.12px", // Adjusted margin top
    marginBottom: "6.67px", // Adjusted margin bottom
    textAlign: "center",
  };

  const formStyle = {
    width: "400px", // Adjusted width
    height: "auto",
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: "6.67px", // Adjusted border radius
    backdropFilter: "blur(66.67px)", // Adjusted backdrop filter
    border: "1.34px solid rgba(255,255,255,0.1)", // Adjusted border
    boxShadow: "0 0 26.67px rgba(8,7,16,0.3)", // Adjusted box shadow
    padding: "33.34px 66.67px", // Adjusted padding
    fontSize: "13.33px",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <video
        autoPlay
        loop
        muted
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: "-1",
        }}
      >
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <form
        onSubmit={handleSubmit}
        style={{
          ...formStyle,
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>SignIn</h1>
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="username" style={{ color: "#fff" }}>
            User Name
          </label>
          <input
            type="text"
            id="username"
            name="username"
            required
            autoComplete="username"
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="password" style={{ color: "#fff" }}>
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            autoComplete="current-password"
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="room_id" style={{ color: "#fff" }}>
            Room Id
          </label>
          <input
            type="text"
            id="room_id"
            name="room_id"
            required
            autoComplete="room_id"
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <button type="submit" style={{ ...ButtonStyle, marginTop: "20px" }}>
          Login In
        </button>
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <Link to={"/"} style={{ color: "#1976d2", textDecoration: "none" }}>
            Don't have an account? Register
          </Link>
        </div>
      </form>
      <Toaster position="top-right" />
    </div>
  );
}
