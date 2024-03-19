
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import bgVideo from "../assets/background-video4.mp4";

const SignUp = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [otp, setOtp] = useState("");
  const [disable, setDisable] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    let intervalId;
    if (disable) {
      intervalId = setInterval(() => {
        setTimeRemaining((prevTime) => Math.max(0, prevTime - 1000));
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [disable]);

  useEffect(() => {
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };
    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);

  const handleSendOtp = () => {
    if (!validateInput()) return;
    axios
      .post("http://localhost:3000/api/user/register", userInfo)
      .then(async (response) => {
        if (!response.data.success) toast.error(response.data.message);
        else {
          toast.success(response.data.message);
          setDisable(true);
          setTimeRemaining(120000);
        }
      })
      .catch((error) => console.log(error));
  };

  const handleVerify = () => {
    axios
      .post("http://localhost:3000/api/user/verify", {
        otp,
        email: userInfo.email,
      })
      .then(async (response) => {
        if (response.data.success) {
          toast.success(response.data.message);
          navigate("/login");
        } else toast.error(response.data.message);
      })
      .catch((error) => console.log(error));
  };

  const validateInput = () => {
    const { email, username, password } = userInfo;
    if (!email || !username || !password) {
      toast.error("Please fill in all the fields.");
      return false;
    }
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }
    if (username.length < 4 || username.length > 10) {
      toast.error("Username must be between 4 and 10 characters long.");
      return false;
    }
    if (password.length < 8 || password.length > 12) {
      toast.error("Password must be between 8 and 12 characters long.");
      return false;
    }
    return true;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleOtpChange = (e) => {
    const { value } = e.target;
    if (value.length <= 4) setOtp(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const inputStyle = {
    display: "block",
    border: "none",
    height: "50px",
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.4)",
    borderRadius: "5px",
    padding: "0 10px",
    marginTop: "2px",
    fontSize: "18px",
    fontWeight: "300",
    marginBottom: "16px",
  };

  const buttonStyle = {
    width: "100%",
    backgroundColor: "#1976d2",
    border: "none",
    color: "#080710",
    padding: "15px 0",
    fontSize: "18px",
    fontWeight: "600",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "36px",
    marginBottom: "10px",
    textAlign: "center",
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
      {/* <style>
        {`
          * {
            outline: 1px solid red;
          }
        `}
      </style> */}
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
          width: "600px",
          height:"auto",
          backgroundColor: "rgba(255,255,255,0.3)",
          borderRadius: "10px",
          backdropFilter: "blur(100px)",
          border: "2px solid rgba(255,255,255,0.1)",
          boxShadow: "0 0 40px rgba(8,7,16,0.3)",
          padding: "50px 100px",
          fontSize: "20px",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>SignUp</h1>
        <div>
          {["Email", "Username", "Password"].map((field) => (
            <div key={field}>
              <label>{field}:</label>
              <input
                type={field === "Password" ? "password" : "text"}
                required
                name={field.toLowerCase()}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
                }
                style={inputStyle}
              />
            </div>
          ))}
        </div>
        <button type="button" onClick={handleSendOtp} style={{...buttonStyle,  marginTop: "26px"}}>
          Send OTP
        </button>
        
        <input
          placeholder={`Time remaining: ${Math.floor(timeRemaining / 60000)}:${(
            (timeRemaining % 60000) /
            1000
          )
            .toFixed(0)
            .padStart(2, "0")}`}
          name="otp"
          value={otp}
          onChange={handleOtpChange}
          style={{
            ...inputStyle,
            marginTop: "32px",
            marginBottom: "6px",
            textAlign: "center",
          }}
          maxLength="4"
          autoComplete="one-time-code"
          disabled={!disable}
        />
        <button
          type="button"
          onClick={handleVerify}
          style={buttonStyle }
          disabled={!disable}
        >
          Verify
        </button>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Link to={"/login"} style={{ textDecoration: "none" , color: "#1976d2" }}>
            Already have an account? SignIn
          </Link>
        </div>
      </form>
      <Toaster position="top-right" />
    </div>
  );
};

export default SignUp;
