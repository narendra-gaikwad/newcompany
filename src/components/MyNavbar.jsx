import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import { useNavigate } from "react-router-dom";
import starLogo from "../assets/img/brand/star.png";

const MyNavbar = ({ userEmail }) => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      alert("You have been logged out.");
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  const navbarStyle = {
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "5px 20px",
    backgroundColor: "light",
  };
  const logoStyle = {
    width: "80px",
    height: "auto",
    marginRight: "10px",
  };
  return (
    <Navbar color="light" light expand="md" style={navbarStyle}>
      <NavbarBrand href="/dashboard">
        <div>
          <img src={starLogo} alt="Your Logo" style={logoStyle} />
        </div>
      </NavbarBrand>
      <Nav className="ml-auto" navbar>
        <div className="user-info">
          <span>{userEmail}</span>
          <button onClick={handleSignOut}>LOGOUT</button>
        </div>
      </Nav>
    </Navbar>
  );
};

export default MyNavbar;
