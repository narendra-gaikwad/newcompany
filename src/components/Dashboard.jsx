// import React, { useEffect, useState } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "../firebase";
// import "../components/dashboard.css";
// import dashboardImage from "../assets/imageDash.png";
// import ChapterForm from "./ChapterForm";

// const Dashboard = () => {
//   const [userData, setUserData] = useState(null);
//   const [showClassButtons, setShowClassButtons] = useState(false);
//   const [selectedClass, setSelectedClass] = useState(null);
//   const [selectedSubject, setSelectedSubject] = useState(null);
//   const [showScreen2, setShowScreen2] = useState(false);
//   const [showScreen3, setShowScreen3] = useState(false);
//   const [showChapterForm, setShowChapterForm] = useState(false);

//   useEffect(() => {
//     onAuthStateChanged(auth, (user) => {
//       if (user) setUserData(user);
//       else setUserData(null);
//     });
//   }, []);

//   const handleSelectClassClick = () => {
//     setShowClassButtons((prev) => !prev);
//   };

//   const handleClassButtonClick = (className) => {
//     setSelectedClass(className);
//     setShowClassButtons(false);
//     setShowScreen2(true);
//   };

//   const handleVideoButtonClick = () => {
//     setShowScreen2(false);
//     setShowScreen3(true);
//   };

//   const handleCloseScreen2 = () => {
//     setSelectedClass(null);
//     setShowScreen2(false);
//     setShowScreen3(false);
//     setShowChapterForm(false);
//   };

//   const handleSubjectButtonClick = (subjectName) => {
//     setSelectedSubject(subjectName);
//     setShowChapterForm(true);
//   };

//   const handleCloseChapterForm = () => {
//     setSelectedSubject(null);
//     setShowChapterForm(false);
//   };

//   if (!userData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container container-dashboard">
//       <h2>Welcome : {userData.email}</h2>
//       {/* <img
//         src={dashboardImage}
//         alt="Dashboard Background"
//         className="background-image"
//       /> */}
//       <button className="select-class-btn" onClick={handleSelectClassClick}>
//         SELECT CLASS
//       </button>
//       <div className={`class-buttons ${showClassButtons ? "show" : ""}`}>
//         <button
//           className="dash-btn"
//           onClick={() => handleClassButtonClick("Class 1")}
//         >
//           CLASS 1
//         </button>
//         <button
//           className="dash-btn"
//           onClick={() => handleClassButtonClick("Class 2")}
//         >
//           CLASS 2
//         </button>
//         <button
//           className="dash-btn"
//           onClick={() => handleClassButtonClick("Class 3")}
//         >
//           CLASS 3
//         </button>
//         <button
//           className="dash-btn"
//           onClick={() => handleClassButtonClick("Class 4")}
//         >
//           CLASS 4
//         </button>
//         <button
//           className="dash-btn"
//           onClick={() => handleClassButtonClick("Class 5")}
//         >
//           CLASS 5
//         </button>
//       </div>
//       {showScreen2 && selectedClass && (
//         <div className="screen2">
//           <h2>{selectedClass}:</h2>
//           <div className="screen2-buttons">
//             <button className="screen2-btn" onClick={handleVideoButtonClick}>
//               VIDEO
//             </button>
//             <button className="screen2-btn">WEEKLY EXAM</button>
//             <button className="screen2-btn">SCHOLARSHIP EXAM</button>
//             <button className="screen2-btn">PDF</button>
//           </div>
//           <button className="close-btn" onClick={handleCloseScreen2}>
//             CLOSE
//           </button>
//         </div>
//       )}
//       {showScreen3 && (
//         <div className="screen3">
//           <h2>Video Subjects Name</h2>
//           <div className="screen3-buttons">
//             <button
//               className="screen3-btn"
//               onClick={() => handleSubjectButtonClick("SUBJECT 1")}
//             >
//               SUBJECT 1
//             </button>
//             <button
//               className="screen3-btn"
//               onClick={() => handleSubjectButtonClick("SUBJECT 2")}
//             >
//               SUBJECT 2
//             </button>
//             <button
//               className="screen3-btn"
//               onClick={() => handleSubjectButtonClick("SUBJECT 3")}
//             >
//               SUBJECT 3
//             </button>
//             <button
//               className="screen3-btn"
//               onClick={() => handleSubjectButtonClick("SUBJECT 4")}
//             >
//               SUBJECT 4
//             </button>
//             <button
//               className="screen3-btn"
//               onClick={() => handleSubjectButtonClick("SUBJECT 5")}
//             >
//               SUBJECT 5
//             </button>
//           </div>
//           <button className="close-btn" onClick={handleCloseScreen2}>
//             CLOSE
//           </button>
//         </div>
//       )}

//       {showChapterForm && (
//         <ChapterForm
//           selectedClass={selectedClass}
//           selectedSubject={selectedSubject}
//           onCloseForm={handleCloseChapterForm}
//         />
//       )}
//     </div>
//   );
// };

// export default Dashboard;

// import React, { useEffect, useState } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "../firebase";
// import "../components/dashboard.css";
// // import dashboardImage from "../assets/imageDash.png";
// import ChapterForm from "./ChapterForm";
// import Navbar from "./Navbar";
// import LeftSideMenu from "./LeftSideMenu";

// const Dashboard = () => {
//   const [userData, setUserData] = useState(null);
//   const [showClassButtons, setShowClassButtons] = useState(false);
//   const [selectedClass, setSelectedClass] = useState(null);
//   const [selectedSubject, setSelectedSubject] = useState(null);
//   const [showScreen3, setShowScreen3] = useState(false);
//   const [showScreen2, setShowScreen2] = useState(false);
//   const [showChapterForm, setShowChapterForm] = useState(false);

//   useEffect(() => {
//     onAuthStateChanged(auth, (user) => {
//       if (user) setUserData(user);
//       else setUserData(null);
//     });
//   }, []);

//   const handleSelectClassClick = () => {
//     setShowClassButtons((prev) => !prev);
//   };

//   const handleClassButtonClick = (className) => {
//     setSelectedClass(className);
//     setShowClassButtons(false);
//     setShowScreen2(true);
//   };

//   const handleVideoButtonClick = () => {
//     setShowScreen2(false);
//     setShowScreen3(true);
//     setShowChapterForm(true);
//   };

//   const handleCloseScreen2 = () => {
//     setSelectedClass(null);
//     setShowScreen2(false);
//     setShowScreen3(false);
//     setShowChapterForm(false);
//   };

//   const handleSubjectButtonClick = (subjectName) => {
//     setSelectedSubject(subjectName);
//     setShowScreen2(false);

//     setShowScreen3(true);
//   };

//   const handleCloseChapterForm = () => {
//     setSelectedSubject(null);
//     setShowChapterForm(false);
//   };

//   if (!userData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container container-dashboard">
//       <Navbar userEmail={userData.email} />
//       {/* <LeftSideMenu /> */}

//       <h2>Welcome : {userData.email}</h2>
//       {/* <img
//         src={dashboardImage}
//         alt="Dashboard Background"
//         className="background-image"
//       /> */}
//       <button className="select-class-btn" onClick={handleSelectClassClick}>
//         SELECT CLASS
//       </button>
//       <div className={`class-buttons ${showClassButtons ? "show" : ""}`}>
//         <button
//           className="dash-btn"
//           onClick={() => handleClassButtonClick("Class 1")}
//         >
//           CLASS 1
//         </button>
//         <button
//           className="dash-btn"
//           onClick={() => handleClassButtonClick("Class 2")}
//         >
//           CLASS 2
//         </button>
//         <button
//           className="dash-btn"
//           onClick={() => handleClassButtonClick("Class 3")}
//         >
//           CLASS 3
//         </button>
//         <button
//           className="dash-btn"
//           onClick={() => handleClassButtonClick("Class 4")}
//         >
//           CLASS 4
//         </button>
//         <button
//           className="dash-btn"
//           onClick={() => handleClassButtonClick("Class 5")}
//         >
//           CLASS 5
//         </button>
//       </div>

//       {showScreen2 && (
//         <div className="screen2">
//           <h2>Subjects Name</h2>
//           <div className="screen2-buttons">
//             <button
//               className="screen2-btn"
//               onClick={() => handleSubjectButtonClick("BALBHARTI (MAHARATHI)")}
//             >
//               "BALBHARTI (MAHARATHI)"
//             </button>
//             <button
//               className="screen2-btn"
//               onClick={() => handleSubjectButtonClick("ENGLISH")}
//             >
//               ENGLISH
//             </button>
//             <button
//               className="screen2-btn"
//               onClick={() => handleSubjectButtonClick("KHELU KARU SHIKU")}
//             >
//               KHELU KARU SHIKU
//             </button>
//             <button
//               className="screen2-btn"
//               onClick={() => handleSubjectButtonClick("MATH")}
//             >
//               MATH
//             </button>
//             <button
//               className="screen2-btn"
//               onClick={() => handleSubjectButtonClick("HISTORY")}
//             >
//               HISTORY
//             </button>
//           </div>
//           <button className="close-btn" onClick={handleCloseScreen2}>
//             CLOSE
//           </button>
//         </div>
//       )}
//       {showScreen3 && selectedClass && (
//         <div className="screen3">
//           <h2>{selectedClass}:</h2>
//           <div className="screen3-buttons">
//             <button className="screen3-btn" onClick={handleVideoButtonClick}>
//               VIDEO
//             </button>
//             <button className="screen3-btn">WEEKLY EXAM</button>
//             <button className="screen3-btn">SCHOLARSHIP EXAM</button>
//             <button className="screen3-btn">PDF</button>
//           </div>
//           <button className="close-btn" onClick={handleCloseScreen2}>
//             CLOSE
//           </button>
//         </div>
//       )}
//       {showChapterForm && (
//         <ChapterForm
//           selectedClass={selectedClass}
//           selectedSubject={selectedSubject}
//           onCloseForm={handleCloseChapterForm}
//         />
//       )}
//     </div>
//   );
// };

import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import "../components/dashboard.css";
import ChapterForm from "./ChapterForm";
import Navbar from "./Navbar";
import LeftSideMenu from "./LeftSideMenu";
import { Container, Button, Table, Card, CardHeader, Row } from "reactstrap";

import "bootstrap/dist/css/bootstrap.min.css";

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

  return (
    <>
      {/* <Navbar userEmail={userData.email} /> */}
      {/* <div className="user-email">
        <h2>Welcome: {userData.email}</h2>
      </div> */}
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
                  </tbody>
                </Table>
              </div>
            )}

            {showSubjectsTable && (
              <div className="screen2">
                {/* <h2>Subjects</h2> */}
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
                    <tr>
                      <td>
                        <Button
                          className="screen2-btn"
                          onClick={() =>
                            handleSubjectButtonClick("BALBHARTI (MAHARATHI)")
                          }
                        >
                          BALBHARTI (MAHARATHI)
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Button
                          className="screen2-btn"
                          onClick={() => handleSubjectButtonClick("Maths")}
                        >
                          MATHS
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Button
                          className="screen2-btn"
                          onClick={() => handleSubjectButtonClick("History")}
                        >
                          HISTORY
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Button
                          className="screen2-btn"
                          onClick={() => handleSubjectButtonClick("English")}
                        >
                          ENGLISH
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Button
                          className="screen2-btn"
                          onClick={() => handleSubjectButtonClick("Khel Khelu")}
                        >
                          KHELU KARU SHIKU
                        </Button>
                      </td>
                    </tr>
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
                          onClick={handleVideoButtonClick}
                        >
                          EXAMS
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Button
                          className="screen3-btn"
                          onClick={handleVideoButtonClick}
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
              />
            )}
          </Card>
        </Container>
      </div>
    </>
  );
};

export default Dashboard;
