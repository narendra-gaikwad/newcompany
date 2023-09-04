import React, { useState } from "react";
import "../components/professorTable.css"; 

const CollapsibleMenu = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="collapsible-menu">
      <div className="menu-header" onClick={toggleMenu}>
        Professors
      </div>
      {showMenu && <div className="menu-content">{children}</div>}
    </div>
  );
};

const ProfessorTable = () => {
  const professors = [
    {
      Name: "Tiger Nixon",
      Department: "Architect",
      Gender: "Male",
      Education: "M.COM., P.H.D.",
      Mobile: "123 456 7890",
      Email: "info@example.com",
      "Joining Date": "2011/04/25",
    },
    {
      Name: "Garrett Winters",
      Department: "Accountant",
      Gender: "Female",
      Education: "M.COM., P.H.D.",
      Mobile: "987 654 3210",
      Email: "info@example.com",
      "Joining Date": "2011/07/25",
    },
    {
      Name: "Ashton Cox",
      Department: "Junior Technical",
      Gender: "Male",
      Education: "B.COM., M.COM.",
      Mobile: "(123) 4567 890",
      Email: "info@example.com",
      "Joining Date": "2009/01/12",
    },
  ];

  return (
    <div>
      <CollapsibleMenu>
        <h2>All Professors</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Gender</th>
              <th>Education</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Joining Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {professors.map((professor, index) => (
              <tr key={index}>
                <td>{professor.Name}</td>
                <td>{professor.Department}</td>
                <td>{professor.Gender}</td>
                <td>{professor.Education}</td>
                <td>{professor.Mobile}</td>
                <td>{professor.Email}</td>
                <td>{professor["Joining Date"]}</td>
              
              </tr>
            ))}
          </tbody>
        </table>
      </CollapsibleMenu>
    </div>
  );
};

export default ProfessorTable;
