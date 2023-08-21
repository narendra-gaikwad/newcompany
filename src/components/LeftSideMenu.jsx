import React from "react";
import "../components/leftSideMenu.css";

const LeftSideMenu = () => {
  return (
    <div className="main-menu">
      <div className="menu-list">
        <div className="main-menuh">Main menu</div>

        {/* <div className="menu-item">MAIN MENU</div> */}
        <div className="menu-item">Dashboard</div>
        <div className="menu-item">Classes Lists</div>
        <div className="menu-item has-submenu">
          Students
          <div className="sub-menu">
            <div className="menu-item">All Students</div>
            <div className="menu-item">Add Students</div>
            <div className="menu-item">Edit Students</div>
            <div className="menu-item">About Students</div>
          </div>
        </div>
        <div className="menu-item">Courses</div>
        <div className="menu-item">Library</div>
        <div className="menu-item">Departments</div>
      </div>
    </div>
  );
};

export default LeftSideMenu;
