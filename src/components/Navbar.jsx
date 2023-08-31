import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "../components/navbar.css";

const Navbar = ({ userEmail }) => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">Star Logo</div>
      <div className="user-info">
        <span>{userEmail}</span>
        <button onClick={handleSignOut}>LOGOUT</button>
      </div>
    </nav>
  );
};

export default Navbar;
