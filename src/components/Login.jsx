import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "firebase/auth";
import "../components/login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";
import "../components/login.css";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const error = useSelector((state) => state.auth.error);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const userCreatdential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCreatdential.user;
      setIsLoading(false);
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
          style={{ marginBottom: "10px", borderRadius: "14px" }}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="PASSWORD"
          value={password}
          style={{ marginBottom: "10px", borderRadius: "14px" }}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="login-buttons">
          <button
            type="submit"
            style={{ borderRadius: "14px" }}
            disabled={isLoading}
          >
            {isLoading ? (
              <ClipLoader
                color={"#ffffff"}
                loading={isLoading}
                css={override}
                size={18}
              />
            ) : (
              "LOGIN"
            )}
          </button>
          <button
            type="button"
            style={{ borderRadius: "14px" }}
            onClick={handleRegister}
          >
            REGISTER
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
