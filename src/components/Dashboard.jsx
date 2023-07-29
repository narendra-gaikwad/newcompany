import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import "../components/dashboard.css"; 
import dashboardImage from "../assets/imageDash.png";
import ChapterForm from "./ChapterForm";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [showClassButtons, setShowClassButtons] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null); 
  const [showScreen2, setShowScreen2] = useState(false);
  const [showScreen3, setShowScreen3] = useState(false);
  const [showChapterForm, setShowChapterForm] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUserData(user);
      else setUserData(null);
    });
  }, []);

  const handleSelectClassClick = () => {
    setShowClassButtons((prev) => !prev);
  };

  const handleClassButtonClick = (className) => {
    setSelectedClass(className);
    setShowClassButtons(false);
    setShowScreen2(true);
  };

  const handleVideoButtonClick = () => {
    setShowScreen2(false);
    setShowScreen3(true);
  };

  const handleCloseScreen2 = () => {
    setSelectedClass(null);
    setShowScreen2(false);
    setShowScreen3(false);
    setShowChapterForm(false);
  };

  const handleSubjectButtonClick = (subjectName) => {
    setSelectedSubject(subjectName);
    setShowChapterForm(true);
  };

  const handleCloseChapterForm = () => {
    setSelectedSubject(null);
    setShowChapterForm(false);
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container container-dashboard">
      <h2>Welcome : {userData.email}</h2>
      {/* <img
        src={dashboardImage}
        alt="Dashboard Background"
        className="background-image"
      /> */}
      <button className="select-class-btn" onClick={handleSelectClassClick}>
        SELECT CLASS
      </button>
      <div className={`class-buttons ${showClassButtons ? "show" : ""}`}>
        <button
          className="dash-btn"
          onClick={() => handleClassButtonClick("Class 1")}
        >
          CLASS 1
        </button>
        <button
          className="dash-btn"
          onClick={() => handleClassButtonClick("Class 2")}
        >
          CLASS 2
        </button>
        <button
          className="dash-btn"
          onClick={() => handleClassButtonClick("Class 3")}
        >
          CLASS 3
        </button>
        <button
          className="dash-btn"
          onClick={() => handleClassButtonClick("Class 4")}
        >
          CLASS 4
        </button>
        <button
          className="dash-btn"
          onClick={() => handleClassButtonClick("Class 5")}
        >
          CLASS 5
        </button>
      </div>
      {showScreen2 && selectedClass && (
        <div className="screen2">
          <h2>{selectedClass}:</h2>
          <div className="screen2-buttons">
            <button className="screen2-btn" onClick={handleVideoButtonClick}>
              VIDEO
            </button>
            <button className="screen2-btn">WEEKLY EXAM</button>
            <button className="screen2-btn">SCHOLARSHIP EXAM</button>
            <button className="screen2-btn">PDF</button>
          </div>
          <button className="close-btn" onClick={handleCloseScreen2}>
            CLOSE
          </button>
        </div>
      )}
      {showScreen3 && (
        <div className="screen3">
          <h2>Video Subjects Name</h2>
          <div className="screen3-buttons">
            <button
              className="screen3-btn"
              onClick={() => handleSubjectButtonClick("SUBJECT 1")}
            >
              SUBJECT 1
            </button>
            <button
              className="screen3-btn"
              onClick={() => handleSubjectButtonClick("SUBJECT 2")}
            >
              SUBJECT 2
            </button>
            <button
              className="screen3-btn"
              onClick={() => handleSubjectButtonClick("SUBJECT 3")}
            >
              SUBJECT 3
            </button>
            <button
              className="screen3-btn"
              onClick={() => handleSubjectButtonClick("SUBJECT 4")}
            >
              SUBJECT 4
            </button>
            <button
              className="screen3-btn"
              onClick={() => handleSubjectButtonClick("SUBJECT 5")}
            >
              SUBJECT 5
            </button>
          </div>
          <button className="close-btn" onClick={handleCloseScreen2}>
            CLOSE
          </button>
        </div>
      )}

      {showChapterForm && (
        <ChapterForm
          selectedClass={selectedClass}
          selectedSubject={selectedSubject}
          onCloseForm={handleCloseChapterForm}
        />
      )}
    </div>
  );
};

export default Dashboard;
