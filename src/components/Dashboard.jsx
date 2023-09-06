import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, firestore } from "../firebase";
import "../components/dashboard.css";
import ChapterForm from "./ChapterForm";
import MyNavbar from "./MyNavbar";
// import Navbar from "./Navbar";
// import LeftSideMenu from "./LeftSideMenu";

import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import {
  Container,
  Button,
  Table,
  Card,
  CardHeader,
  Row,
  Col,
  FormGroup,
  Input,
} from "reactstrap";

import "bootstrap/dist/css/bootstrap.min.css";

const classSubjectsMap = {
  "Class 1": ["Marathi", "ENGLISH", "Science", "Math"],
  "Class 2": ["Marathi", "ENGLISH", "Science", "Math"],
  "Class 3": ["Marathi", "ENGLISH", "Science", "Math", "History"],
  "Class 4": ["Marathi", "ENGLISH", "Science", "Math"],
  "Class 5": [
    "Marathi",
    "ENGLISH",
    "Science",
    "Science - Semi",
    "Math",
    "Math - Semi",
    "History",
    "Hindi",
  ],
  "Class 6": [
    "Marathi",
    "ENGLISH",
    "Science",
    "Science - Semi",
    "Math",
    "Math - Semi",
    "History",
    "Hindi",
    "Geography",
  ],
  "Class 7": [
    "Marathi",
    "ENGLISH",
    "Science",
    "Science - Semi",
    "Math",
    "Math - Semi",
    "History & Soc. Science",
    "Hindi",
    "Geography",
  ],
  "Class 8": [
    "Marathi",
    "ENGLISH",
    "Science",
    "Science - Semi",
    "Math",
    "Math - Semi",
    "History & Soc. Science",
    "Hindi",
    "Geography",
  ],
  "Class 9": [
    "Marathi",
    "English",
    "Hindi",
    "Science - 1",
    "Science - 2",
    "Science - 1",
    "Science - 2",
    "Math - Algebra",
    "Math - Geometry",
    "Math - Algebra",
    "Math - Geometry",
    "History – Political Sci.",
    "Geography",
  ],
  "Class 10": [
    "Marathi",
    "English",
    "Hindi",
    "Science - 1",
    "Science - 2",
    "Science - 1",
    "Science - 2",
    "Math - Algebra",
    "Math - Geometry",
    "Math - Algebra",
    "Math - Geometry",
    "History & Political Sci.",
    "Geography",
  ],
  "Class 11 Art's": [
    "Marathi",
    "History",
    "Geography",
    "Economics",
    "Political Science",
    "English",
    "Co-Operation",
    "Sociology",
    "Defence",
    "Psychology",
    "Education",
  ],
  "Class 11 commerce": [
    "Marathi",
    "English",
    "Hindi",
    "Account",
    "Economics",
    "EV. Education",
    "Organization of Comm. & Mgmt.",
    "Secretarial Practice",
    "Co-Operation",
    "Geography",
  ],
  "Class 11 Science": [
    "English",
    "Math - 1",
    "Math - 2",
    "Biology",
    "Chemistry",
    "Physics",
    "Marathi",
    "Geography",
    "Hindi",
    "IT",
  ],
  "Class 12 Art's": [
    "Marathi",
    "History",
    "Geography",
    "Economics",
    "Political Science",
    "English",
    "Co-Operation",
    "Sociology",
    "Defence",
    "Psychology",
    "Education",
  ],
  "Class 12 Commers": [
    "Marathi",
    "English",
    "Hindi",
    "Account",
    "Economics",
    "EV. Education",
    "Organization of Comm. & Mgmt.",
    "Secretarial Practice",
    "Co-Operation",
    "Geography",
  ],
  "Class 12 Science": [
    "English",
    "Math - 1",
    "Math - 2",
    "Biology",
    "Chemistry",
    "Physics",
    "Marathi",
    "Geography",
    "Hindi",
    "IT",
  ],
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

  const [paymentData, setPaymentData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPaymentData, setFilteredPaymentData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataRef = collection(firestore, "usersData");
        const q = query(dataRef, where("payment_status", "==", "Unverified"));

        const querySnapshot = await getDocs(q);

        const paymentDataArray = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          paymentDataArray.push({
            uid: doc.id,
            payment_status: data.payment_status,
            signupData: data.signupData,
            transaction_Id: data.transaction_Id,
          });
        });
        // const filteredData = paymentDataArray.filter(
        //   (data) =>
        //     data.signupData.email
        //       .toLowerCase()
        //       .includes(searchQuery.toLowerCase()) ||
        //     data.transaction_Id
        //       .toLowerCase()
        //       .includes(searchQuery.toLowerCase()) ||
        //     data.uid.toLowerCase().includes(searchQuery.toLowerCase())
        // );

        // setFilteredPaymentData(filteredData);

        setPaymentData(
          paymentDataArray.map((data) => ({
            ...data,
            workingStatus: data.payment_status,
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    onAuthStateChanged(auth, (user) => {
      if (user) setUserData(user);
      else setUserData(null);
    });
  }, [searchQuery, paymentData]);

  const handleUpdatePaymentStatus = async (index) => {
    try {
      const updatedPaymentData = [...paymentData];
      const userDocRef = doc(firestore, "usersData", paymentData[index].uid);
      console.log("Document Reference:", userDocRef.path);

      const currentTime = new Date().toLocaleString();

      await updateDoc(userDocRef, {
        payment_status: updatedPaymentData[index].workingStatus,
        "signupData.timeStamp": currentTime,
      });

      console.log("Payment status and timestamp updated successfully");
      window.alert("Payment status and timestamp updated successfully");

      setPaymentData(updatedPaymentData);
    } catch (error) {
      console.error("Error updating payment status and timestamp:", error);
    }
  };

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
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  const isAdmin = userData.email === "admin@gmail.com";
  const isLocal = userData.email === "local@gmail.com";

  return (
    <>
      <MyNavbar userEmail={userData.email} />
      {/* <Navbar userEmail={userData.email} /> */}
      {/* <div>
        <h2>Welcome: {userData.email}</h2>
      </div> */}
      {/* <LeftSideMenu /> */}
      <div>
        <Container className="container container-dashboard">
          <Card className="dashboard-card">
            {!isLocal && (
              <CardHeader>
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Upload Class Wise Video</h3>
                  </div>
                </Row>
              </CardHeader>
            )}
            {!isLocal && showClassButtons && (
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
                    <tr>
                      <td>
                        <Button
                          className="dash-btn"
                          onClick={() => handleClassButtonClick("Class 7")}
                        >
                          CLASS 7
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Button
                          className="dash-btn"
                          onClick={() => handleClassButtonClick("Class 8")}
                        >
                          CLASS 8
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Button
                          className="dash-btn"
                          onClick={() => handleClassButtonClick("Class 9")}
                        >
                          CLASS 9
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Button
                          className="dash-btn"
                          onClick={() => handleClassButtonClick("Class 10")}
                        >
                          CLASS 10
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Button
                          className="dash-btn"
                          onClick={() =>
                            handleClassButtonClick("Class 11 Art's")
                          }
                        >
                          CLASS 11 Art's
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Button
                          className="dash-btn"
                          onClick={() =>
                            handleClassButtonClick("Class 11 commerce")
                          }
                        >
                          CLASS 11 Commerce
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Button
                          className="dash-btn"
                          onClick={() =>
                            handleClassButtonClick("Class 11 Science")
                          }
                        >
                          CLASS 11 Science
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Button
                          className="dash-btn"
                          onClick={() =>
                            handleClassButtonClick("Class 12 Art's")
                          }
                        >
                          CLASS 12 Art's
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Button
                          className="dash-btn"
                          onClick={() =>
                            handleClassButtonClick("Class 12 Commers")
                          }
                        >
                          CLASS 12 Commers
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Button
                          className="dash-btn"
                          onClick={() =>
                            handleClassButtonClick("Class 12 Science")
                          }
                        >
                          CLASS 12 Science
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
                        <Button className="screen3-btn">EXAMS</Button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Button className="screen3-btn">PDF</Button>
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

        <div className="pl-lg-2">
          {isLocal && (
            <div className="pl-lg-4">
              <Input
                type="text"
                placeholder="Search Data"
                value={searchQuery}
                onChange={handleSearchInputChange}
              />
              {filteredPaymentData.map((data, index) => (
                <Row key={index} className="mb-4">
                  <Col lg="9">
                    <div className="mb-3">
                      <strong>payment_status</strong> {data.payment_status}
                    </div>

                    <div className="mb-3">
                      <strong>Email:</strong> {data.signupData.email}
                    </div>

                    <div className="mb-3">
                      <strong>transaction_Id:</strong> {data.transaction_Id}
                    </div>
                    <div className="mb-3">
                      <strong>uid:</strong> {data.signupData.uid}
                    </div>
                  </Col>

                  <Col lg="3">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor={`input-working-status-${index}`}
                      >
                        Working Status
                      </label>
                      <Input
                        type="select"
                        className="form-control"
                        id={`input-working-status-${index}`}
                        value={data.workingStatus}
                        onChange={(e) => {
                          const updatedPaymentData = [...filteredPaymentData];
                          updatedPaymentData[index].workingStatus =
                            e.target.value;
                          setFilteredPaymentData(updatedPaymentData); // Update the filtered data
                        }}
                      >
                        <option value="Verified">Verified</option>
                        <option value="Unverified">Unverified</option>
                      </Input>
                    </FormGroup>
                    <Button onClick={() => handleUpdatePaymentStatus(index)}>
                      Update Payment Status
                    </Button>
                  </Col>
                </Row>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
