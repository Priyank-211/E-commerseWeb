import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(backendUrl + "/api/user/admin", {
        email,
        password,
      });
      if (response.data.success) {
        setToken(response.data.token);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="glass-panel login-card">
        <h1 className="login-title">Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="form-input"
              type="email"
              placeholder="your@email.com"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="form-input"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <button className="btn btn-primary" style={{ width: "100%", marginTop: "1rem" }} type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
