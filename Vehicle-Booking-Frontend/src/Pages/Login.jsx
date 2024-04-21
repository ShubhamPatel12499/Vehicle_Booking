import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Styles//Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //Login Logic
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://vehicle-booking-backend-yp4t.onrender.com/users/login",
        {
          email,
          password,
        }
      );
      if (response.data.msg === "Login Successful") {
        localStorage.setItem("token", response.data.token);
        alert("User Logged in Successfully!");
        navigate("/allVehicles");
      } else {
        setError(response.data);
        alert("Please Register First!");
        navigate("/signup");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Please Register First!");
      navigate("/signup");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <label>
          Email :
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Login</button>
        <p>If you are a new user, please <a href="/signup">Register</a> first.</p>
        {loading && ( 
        <div className="loading-overlay">
          <div className="spinner"></div>
          <div>Loading...</div>
        </div>
        )}
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
