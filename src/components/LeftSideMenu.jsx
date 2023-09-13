import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "../components/leftSideMenu.css";

const LeftSideMenu = () => {
  return (
    <div className="main-menu">
      <div className="menu-list">
        <div className="main-menuh">Main menu</div>

        <Link to="/dashboard" className="menu-item">
          Dashboard
        </Link>
        <Link to="/all-product-list" className="menu-item">
          All Product List
        </Link>
        {/* <div className="menu-item has-submenu">
          Students
          <div className="sub-menu">
            <Link to="/all-students" className="menu-item">
              All Students
            </Link>
            <Link to="/add-student" className="menu-item">
              Add Students
            </Link>
            <Link to="/edit-student" className="menu-item">
              Edit Students
            </Link>
            <Link to="/about-students" className="menu-item">
              About Students
            </Link>
          </div>
        </div> */}
        <Link to="/add-product" className="menu-item">
          Add Procuct
        </Link>
      </div>
    </div>
  );
};

export default LeftSideMenu;
