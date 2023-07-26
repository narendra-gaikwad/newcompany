import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../actions/authActions";
import { Link, useNavigate } from "react-router-dom";
import { firebaseApp } from "../firebase";
import "firebase/auth";
import "../components/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const error = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await firebaseApp.auth().signInWithEmailAndPassword(email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="container container-login">
      <div className="form-heading">
        <h1>Login</h1>
      </div>
      {error && <div>{error}</div>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="EMAIL"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="PASSWORD"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="login-buttons">
          <button type="submit">LOGIN</button>
          <button type="button" onClick={handleRegister}>
            REGISTER
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
