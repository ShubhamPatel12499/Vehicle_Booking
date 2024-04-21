import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Styles//Signup.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //Signup Logic
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        "https://vehicle-booking-backend-yp4t.onrender.com/users/register",
        {
          name,
          email,
          password,
          gender,
        }
      );
      alert("User Registered Successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error signing up:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup} className="signup-form">
        <label>
          Name :
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <br />
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
          Password :
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Gender :
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </select>
        </label>
     
        <br />
        <button type="submit">Signup</button>
        <p>If you are already registered, please <a href="/">Login</a>.</p>
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

export default Signup;
