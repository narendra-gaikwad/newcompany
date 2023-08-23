import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import "../components/dashboard.css";
import ChapterForm from "./ChapterForm";
import Navbar from "./Navbar";
import LeftSideMenu from "./LeftSideMenu";
import { Container, Button, Table, Card, CardHeader, Row } from "reactstrap";

import "bootstrap/dist/css/bootstrap.min.css";

const classSubjectsMap = {
  "Class 1": ["MATHS", "ENGLISH"],
  "Class 2": ["HISTORY", "MARATHI", "ENGLISH"],
  "Class 3": ["HINDI", "MARATHI"],
  "Class 4": ["ENGLISH", "MATHS", "ENGLISH"],
  "Class 5": ["MATHS", "MARATHI"],
  "Class 6": ["MARATHI", "HISTORY,ENGLISH"],
};

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [showClassButtons, setShowClassButtons] = useState(true);
  const [showClassesTable, setShowClassesTable] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [showSubjectsTable, setShowSubjectsTable] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [showVideosTable, setShowVideosTable] = useState(false);
  const [showChapterForm, setShowChapterForm] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUserData(user);
      else setUserData(null);
    });
  }, []);

  const handleSelectClassClick = () => {
    setShowClassButtons(false);
    setShowClassesTable(true);
  };

  const handleClassButtonClick = (className) => {
    setSelectedClass(className);
    setShowClassesTable(false);
    setShowSubjectsTable(true);
  };

  const handleSubjectButtonClick = (subjectName) => {
    setSelectedSubject(subjectName);
    setShowSubjectsTable(false);
    setShowVideosTable(true);
  };
  const handleBackToClasses = () => {
    setShowClassesTable(true);
    setShowSubjectsTable(false);
    setShowVideosTable(false);
  };

  const handleBackToSelectClass = () => {
    setShowClassButtons(true);
    setShowClassesTable(false);
    setShowSubjectsTable(false);
    setShowVideosTable(false);
  };

  const handleBackToSubjects = () => {
    setShowClassesTable(false);
    setShowSubjectsTable(true);
    setShowVideosTable(false);
  };

  const handleBackToVideos = () => {
    setShowClassesTable(false);
    setShowSubjectsTable(false);
    setShowChapterForm(false);
    setShowVideosTable(true);
  };

  const handleVideoButtonClick = () => {
    setShowVideosTable(false);
    setShowChapterForm(true);
  };

  const handleCloseChapterForm = () => {
    setShowChapterForm(false);
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  const isAdmin = userData.email === "admin@gmail.com";

  return (
    <>
      {/* <Navbar userEmail={userData.email} /> */}
      <div>
        <h2>Welcome: {userData.email}</h2>
      </div>
      {/* <LeftSideMenu /> */}
      <div>
        <Container className="container container-dashboard">
          <Card className="dashboard-card">
            <CardHeader>
              <Row className="align-items-center">
                <div className="col">
                  <h3 className="mb-0">Upload Class Wise Video</h3>
                </div>
              </Row>
            </CardHeader>
            {showClassButtons && (
              <Button
                className="select-class-btn"
                onClick={handleSelectClassClick}
              >
                SELECT CLASS
              </Button>
            )}

            {showClassesTable && (
              <div className="screen2">
                {/* <h2>Classes</h2> */}
                <Table bordered>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Class Name</th>
                    </tr>
                  </thead>
                  <Button
                    className="back-btn"
                    onClick={handleBackToSelectClass}
                  >
                    Back
                  </Button>
                  <tbody>
                    <tr>
                      <td>
                        <Button
                          className="dash-btn"
                          onClick={() => handleClassButtonClick("Class 1")}
                        >
                          CLASS 1
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Button
                          className="dash-btn"
                          onClick={() => handleClassButtonClick("Class 2")}
                        >
                          CLASS 2
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Button
                          className="dash-btn"
                          onClick={() => handleClassButtonClick("Class 3")}
                        >
                          CLASS 3
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Button
                          className="dash-btn"
                          onClick={() => handleClassButtonClick("Class 4")}
                        >
                          CLASS 4
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Button
                          className="dash-btn"
                          onClick={() => handleClassButtonClick("Class 5")}
                        >
                          CLASS 5
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Button
                          className="dash-btn"
                          onClick={() => handleClassButtonClick("Class 6")}
                        >
                          CLASS 6
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            )}

            {showSubjectsTable && (
              <div className="screen2">
                <Table bordered>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Subject Name</th>
                    </tr>
                  </thead>
                  <Button className="back-btn" onClick={handleBackToClasses}>
                    Back
                  </Button>
                  <tbody>
                    {classSubjectsMap[selectedClass].map((subjectName) => (
                      <tr key={subjectName}>
                        <td>
                          <Button
                            className="screen2-btn"
                            onClick={() =>
                              handleSubjectButtonClick(subjectName)
                            }
                          >
                            {subjectName}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}

            {showVideosTable && (
              <div className="screen3">
                <Table bordered>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Lists of Activities</th>
                    </tr>
                  </thead>
                  <Button className="back-btn" onClick={handleBackToSubjects}>
                    Back
                  </Button>
                  <tbody>
                    <tr>
                      <td>
                        <Button
                          className="screen3-btn"
                          onClick={handleVideoButtonClick}
                        >
                          VIDEOS
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Button
                          className="screen3-btn"
                          // onClick={handleVideoButtonClick}
                        >
                          EXAMS
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Button
                          className="screen3-btn"
                          // onClick={handleVideoButtonClick}
                        >
                          PDF
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            )}
            {showChapterForm && (
              <ChapterForm
                selectedClass={selectedClass}
                selectedSubject={selectedSubject}
                onCloseForm={handleCloseChapterForm}
                onBackToVideos={handleBackToVideos}
                isAdmin={isAdmin}
              />
            )}
          </Card>
        </Container>
      </div>
    </>
  );
};

export default Dashboard;
