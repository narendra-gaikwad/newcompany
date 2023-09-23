// import React, { useState, useEffect } from "react";
// import {
//   Container,
//   Row,
//   Col,
//   Form,
//   FormGroup,
//   Label,
//   Input,
//   Button,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   ListGroup,
//   ListGroupItem,
//   ListGroupItemText,
//   ListGroupItemHeading,
// } from "reactstrap";
// import {
//   collection,
//   addDoc,
//   getDocs,
//   updateDoc,
//   doc as firestoreDoc,
//   deleteDoc,
// } from "firebase/firestore";
// import { firestore } from "../firebase"; // Import your Firestore configuration
// import "../components/exampage.css";

// const ExamPage = () => {
//   const [questions, setQuestions] = useState([]);
//   const [newQuestion, setNewQuestion] = useState("");
//   const [options, setOptions] = useState({ A: "", B: "", C: "", D: "" });
//   const [correctOption, setCorrectOption] = useState("A");
//   const [modal, setModal] = useState(false);

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(firestore, "questions"));
//         const questionData = [];
//         querySnapshot.forEach((doc) => {
//           questionData.push({ id: doc.id, ...doc.data() });
//         });
//         setQuestions(questionData);
//       } catch (error) {
//         console.error("Error fetching questions:", error);
//       }
//     };

//     fetchQuestions();
//   }, []);

//   const toggleModal = () => {
//     setModal(!modal);
//   };

//   const handleAddQuestion = async () => {
//     try {
//       const questionData = {
//         questionText: newQuestion,
//         options,
//         correctOption,
//       };

//       // Add the new question to Firestore
//       const docRef = await addDoc(
//         collection(firestore, "questions"),
//         questionData
//       );

//       // Update the questions state with the new question
//       setQuestions([...questions, { id: docRef.id, ...questionData }]);

//       // Clear the input fields
//       setNewQuestion("");
//       setOptions({ A: "", B: "", C: "", D: "" });
//       setCorrectOption("A");

//       // Show a success alert
//       window.alert("Question added successfully!");

//       // Close the modal
//       toggleModal();
//     } catch (error) {
//       console.error("Error adding question:", error);
//       // Show an error alert
//       window.alert("Error adding question. Please try again.");
//     }
//   };

//   const handleOptionChange = (option, value) => {
//     setOptions({ ...options, [option]: value });
//   };

//   const handleCorrectOptionChange = (e) => {
//     setCorrectOption(e.target.value);
//   };

//   const handleDeleteQuestion = async (questionId) => {
//     try {
//       // Delete the question from Firestore
//       await deleteDoc(firestoreDoc(firestore, "questions", questionId));

//       // Update the questions state by removing the deleted question
//       setQuestions(questions.filter((question) => question.id !== questionId));

//       // Show a success alert
//       window.alert("Question deleted successfully!");
//     } catch (error) {
//       console.error("Error deleting question:", error);
//       // Show an error alert
//       window.alert("Error deleting question. Please try again.");
//     }
//   };

//   return (
//     <Container>
//       <h1 className="my-4">Quiz Page</h1>
//       <Button color="primary" onClick={toggleModal}>
//         Add Question
//       </Button>
//       <p>Total Questions: {questions.length}</p>

//       <ListGroup className="my-4">
//         {questions.map((question, index) => (
//           <ListGroupItem key={question.id} className="mb-2">
//             <ListGroupItemHeading>
//               {index + 1}) {question.questionText}
//             </ListGroupItemHeading>
//             <ListGroupItemText>
//               <ul>
//                 <li>
//                   A. {question.options.A}{" "}
//                   {question.correctOption === "A" && " (Correct)"}
//                 </li>
//                 <li>
//                   B. {question.options.B}{" "}
//                   {question.correctOption === "B" && " (Correct)"}
//                 </li>
//                 <li>
//                   C. {question.options.C}{" "}
//                   {question.correctOption === "C" && " (Correct)"}
//                 </li>
//                 <li>
//                   D. {question.options.D}{" "}
//                   {question.correctOption === "D" && " (Correct)"}
//                 </li>
//               </ul>
//             </ListGroupItemText>
//             <Button
//               color="secondary"
//               className="custom-button"
//               onClick={() => handleDeleteQuestion(question.id)}
//             >
//               Delete
//             </Button>
//           </ListGroupItem>
//         ))}
//       </ListGroup>

//       <Modal isOpen={modal} toggle={toggleModal}>
//         <ModalHeader toggle={toggleModal}>Add Question</ModalHeader>
//         <ModalBody>
//           <Form>
//             <FormGroup>
//               <Label for="newQuestion">Question</Label>
//               <Input
//                 type="text"
//                 id="newQuestion"
//                 value={newQuestion}
//                 onChange={(e) => setNewQuestion(e.target.value)}
//               />
//             </FormGroup>
//             <FormGroup>
//               <Label for="optionA">Option A</Label>
//               <Input
//                 type="text"
//                 id="optionA"
//                 placeholder="Option A"
//                 value={options.A}
//                 onChange={(e) => handleOptionChange("A", e.target.value)}
//               />
//             </FormGroup>
//             <FormGroup>
//               <Label for="optionB">Option B</Label>
//               <Input
//                 type="text"
//                 id="optionB"
//                 placeholder="Option B"
//                 value={options.B}
//                 onChange={(e) => handleOptionChange("B", e.target.value)}
//               />
//             </FormGroup>
//             <FormGroup>
//               <Label for="optionC">Option C</Label>
//               <Input
//                 type="text"
//                 id="optionC"
//                 placeholder="Option C"
//                 value={options.C}
//                 onChange={(e) => handleOptionChange("C", e.target.value)}
//               />
//             </FormGroup>
//             <FormGroup>
//               <Label for="optionD">Option D</Label>
//               <Input
//                 type="text"
//                 id="optionD"
//                 placeholder="Option D"
//                 value={options.D}
//                 onChange={(e) => handleOptionChange("D", e.target.value)}
//               />
//             </FormGroup>
//             <FormGroup>
//               <Label for="correctOption">Select Correct Option</Label>
//               <Input
//                 type="select"
//                 id="correctOption"
//                 value={correctOption}
//                 onChange={handleCorrectOptionChange}
//               >
//                 <option value="A">Option A</option>
//                 <option value="B">Option B</option>
//                 <option value="C">Option C</option>
//                 <option value="D">Option D</option>
//               </Input>
//             </FormGroup>
//           </Form>
//         </ModalBody>
//         <ModalFooter>
//           <Button color="primary" onClick={handleAddQuestion}>
//             Add Question
//           </Button>
//           <Button color="secondary" onClick={toggleModal}>
//             Cancel
//           </Button>
//         </ModalFooter>
//       </Modal>
//     </Container>
//   );
// };

// export default ExamPage;

// import React, { useState } from "react";
// import {
//   Button,
//   Container,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   Form,
//   FormGroup,
//   Label,
//   Input,
// } from "reactstrap";
// import { addDoc, collection } from "firebase/firestore";
// import { firestore } from "../firebase";

// const ExamPage = () => {
//   const [modal, setModal] = useState(false);
//   const [examData, setExamData] = useState({
//     examDate: "",
//     examName: "",
//     totalMarks: "",
//     questionSet: [],
//   });
//   const [newQuestion, setNewQuestion] = useState({
//     questionText: "",
//     answer: "",
//     options: {
//       A: "",
//       B: "",
//       C: "",
//       D: "",
//     },
//   });

//   const toggleModal = () => {
//     setModal(!modal);
//   };

//   const handleInputChange = (field, value) => {
//     setExamData({
//       ...examData,
//       [field]: value,
//     });
//   };

//   const handleQuestionInputChange = (field, value) => {
//     setNewQuestion({
//       ...newQuestion,
//       [field]: value,
//     });
//   };

//   const handleOptionChange = (option, value) => {
//     setNewQuestion({
//       ...newQuestion,
//       options: {
//         ...newQuestion.options,
//         [option]: value,
//       },
//     });
//   };

//   const handleAddQuestion = () => {
//     setExamData({
//       ...examData,
//       questionSet: [...examData.questionSet, { ...newQuestion }],
//     });

//     // Clear the input fields for the new question
//     setNewQuestion({
//       questionText: "",
//       answer: "",
//       options: {
//         A: "",
//         B: "",
//         C: "",
//         D: "",
//       },
//     });
//   };

//   const handleAddExam = async () => {
//     try {
//       // Add the exam data to Firestore
//       const docRef = await addDoc(collection(firestore, "exams"), examData);

//       // Show a success alert
//       window.alert("Exam added successfully!");

//       // Close the modal
//       toggleModal();
//     } catch (error) {
//       console.error("Error adding exam:", error);
//       // Show an error alert
//       window.alert("Error adding exam. Please try again.");
//     }
//   };

//   return (
//     <Container>
//       <h1 className="my-4">Quiz Page</h1>
//       <Button color="primary" onClick={toggleModal}>
//         Add Exam
//       </Button>

//       <Modal isOpen={modal} toggle={toggleModal}>
//         <ModalHeader toggle={toggleModal}>Add Exam</ModalHeader>
//         <ModalBody>
//           <Form>
//             <FormGroup>
//               <Label for="examDate">Exam Date</Label>
//               <Input
//                 type="text"
//                 id="examDate"
//                 value={examData.examDate}
//                 onChange={(e) => handleInputChange("examDate", e.target.value)}
//               />
//             </FormGroup>
//             <FormGroup>
//               <Label for="examName">Exam Name</Label>
//               <Input
//                 type="text"
//                 id="examName"
//                 value={examData.examName}
//                 onChange={(e) => handleInputChange("examName", e.target.value)}
//               />
//             </FormGroup>
//             <FormGroup>
//               <Label for="totalMarks">Total Marks</Label>
//               <Input
//                 type="text"
//                 id="totalMarks"
//                 value={examData.totalMarks}
//                 onChange={(e) =>
//                   handleInputChange("totalMarks", e.target.value)
//                 }
//               />
//             </FormGroup>
//             <FormGroup>
//               <Label for="questionText">Question Text</Label>
//               <Input
//                 type="text"
//                 id="questionText"
//                 value={newQuestion.questionText}
//                 onChange={(e) =>
//                   handleQuestionInputChange("questionText", e.target.value)
//                 }
//               />
//             </FormGroup>
//             <FormGroup>
//               <Label for="answer">Answer</Label>
//               <Input
//                 type="text"
//                 id="answer"
//                 value={newQuestion.answer}
//                 onChange={(e) =>
//                   handleQuestionInputChange("answer", e.target.value)
//                 }
//               />
//             </FormGroup>
//             <FormGroup>
//               <Label for="optionA">Option A</Label>
//               <Input
//                 type="text"
//                 id="optionA"
//                 value={newQuestion.options.A}
//                 onChange={(e) => handleOptionChange("A", e.target.value)}
//               />
//             </FormGroup>
//             <FormGroup>
//               <Label for="optionB">Option B</Label>
//               <Input
//                 type="text"
//                 id="optionB"
//                 value={newQuestion.options.B}
//                 onChange={(e) => handleOptionChange("B", e.target.value)}
//               />
//             </FormGroup>
//             <FormGroup>
//               <Label for="optionC">Option C</Label>
//               <Input
//                 type="text"
//                 id="optionC"
//                 value={newQuestion.options.C}
//                 onChange={(e) => handleOptionChange("C", e.target.value)}
//               />
//             </FormGroup>
//             <FormGroup>
//               <Label for="optionD">Option D</Label>
//               <Input
//                 type="text"
//                 id="optionD"
//                 value={newQuestion.options.D}
//                 onChange={(e) => handleOptionChange("D", e.target.value)}
//               />
//             </FormGroup>
//           </Form>
//           <Button color="primary" onClick={handleAddQuestion}>
//             Add Question
//           </Button>
//           <div>
//             <h3>Questions:</h3>
//             <ul>
//               {examData.questionSet.map((question, index) => (
//                 <li key={index}>{question.questionText}</li>
//               ))}
//             </ul>
//           </div>
//         </ModalBody>
//         <ModalFooter>
//           <Button color="primary" onClick={handleAddExam}>
//             Add Exam
//           </Button>
//           <Button color="secondary" onClick={toggleModal}>
//             Cancel
//           </Button>
//         </ModalFooter>
//       </Modal>
//     </Container>
//   );
// };

// export default ExamPage;

/////////////////////////

import React, { useState } from "react";
import {
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { addDoc, collection, updateDoc, doc } from "firebase/firestore"; // Add these import statements
import { firestore } from "../firebase";

const ExamPage = () => {
  const [modal, setModal] = useState(false);
  const [examData, setExamData] = useState({
    examDate: "",
    examName: "",
    totalMarks: "",
    questionSet: [],
  });
  const [newQuestion, setNewQuestion] = useState({
    questionText: "",
    answer: "",
    options: {
      A: "",
      B: "",
      C: "",
      D: "",
    },
  });

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleInputChange = (field, value) => {
    setExamData({
      ...examData,
      [field]: value,
    });
  };

  const handleQuestionInputChange = (field, value) => {
    setNewQuestion({
      ...newQuestion,
      [field]: value,
    });
  };

  const handleOptionChange = (option, value) => {
    setNewQuestion({
      ...newQuestion,
      options: {
        ...newQuestion.options,
        [option]: value,
      },
    });
  };

  const handleAddQuestion = () => {
    setExamData({
      ...examData,
      questionSet: [...examData.questionSet, { ...newQuestion }],
    });

    // Clear the input fields for the new question
    setNewQuestion({
      questionText: "",
      answer: "",
      options: {
        A: "",
        B: "",
        C: "",
        D: "",
      },
    });
  };

  // const handleAddExam = async () => {
  //   try {
  //     // Add the exam data to Firestore and get the unique ID
  //     const examRef = await addDoc(collection(firestore, "exams"), examData);
  //     const examId = examRef.id;

  //     // Now you can add questions to this exam using the same ID
  //     for (const question of examData.questionSet) {
  //       await addDoc(collection(firestore, "exams", examId), question);
  //     }

  //     // Show a success alert
  //     window.alert("Exam added successfully!");

  //     // Close the modal
  //     toggleModal();
  //   } catch (error) {
  //     console.error("Error adding exam:", error);
  //     // Show an error alert
  //     window.alert("Error adding exam. Please try again.");
  //   }
  // };
  const handleAddExam = async () => {
    try {
      // Add the exam data to Firestore and get the unique ID
      const examRef = await addDoc(collection(firestore, "exams"), examData);
      const examId = examRef.id;

      // Now you can update the exam document with the questions
      await updateDoc(doc(firestore, "exams", examId), {
        questionSet: examData.questionSet,
      });

      // Show a success alert
      window.alert("Exam added successfully!");
      // Clear the input fields
      setExamData({
        examDate: "",
        examName: "",
        totalMarks: "",
        questionSet: [],
      });

      // Close the modal
      toggleModal();
    } catch (error) {
      console.error("Error adding exam:", error);
      // Show an error alert
      window.alert("Error adding exam. Please try again.");
    }
  };

  // const handleAddExam = async () => {
  //   try {
  //     // Add the exam data to Firestore and get the unique ID
  //     const examRef = await addDoc(collection(firestore, "exams"), examData);
  //     const examId = examRef.id;

  //     // Create a subcollection for questions under the exam
  //     const questionsCollectionRef = collection(
  //       firestore,
  //       "exams",
  //       examId,
  //       "questions"
  //     );

  //     // Now you can add questions to the subcollection
  //     for (const question of examData.questionSet) {
  //       await addDoc(questionsCollectionRef, question);
  //     }

  //     // Show a success alert
  //     window.alert("Exam added successfully!");

  //     // Close the modal
  //     toggleModal();
  //   } catch (error) {
  //     console.error("Error adding exam:", error);
  //     // Show the error message in the alert
  //     window.alert(`Error adding exam: ${error.message}`);
  //   }
  // };

  return (
    <Container>
      <h1 className="my-4">Quiz Page</h1>
      <Button color="primary" onClick={toggleModal}>
        Add Exam
      </Button>

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Add Exam</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="examDate">Exam Date</Label>
              <Input
                type="text"
                id="examDate"
                value={examData.examDate}
                onChange={(e) => handleInputChange("examDate", e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="examName">Exam Name</Label>
              <Input
                type="text"
                id="examName"
                value={examData.examName}
                onChange={(e) => handleInputChange("examName", e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="totalMarks">Total Marks</Label>
              <Input
                type="text"
                id="totalMarks"
                value={examData.totalMarks}
                onChange={(e) =>
                  handleInputChange("totalMarks", e.target.value)
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="questionText">Question Text</Label>
              <Input
                type="text"
                id="questionText"
                value={newQuestion.questionText}
                onChange={(e) =>
                  handleQuestionInputChange("questionText", e.target.value)
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="answer">Answer</Label>
              <Input
                type="text"
                id="answer"
                value={newQuestion.answer}
                onChange={(e) =>
                  handleQuestionInputChange("answer", e.target.value)
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="optionA">Option A</Label>
              <Input
                type="text"
                id="optionA"
                value={newQuestion.options.A}
                onChange={(e) => handleOptionChange("A", e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="optionB">Option B</Label>
              <Input
                type="text"
                id="optionB"
                value={newQuestion.options.B}
                onChange={(e) => handleOptionChange("B", e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="optionC">Option C</Label>
              <Input
                type="text"
                id="optionC"
                value={newQuestion.options.C}
                onChange={(e) => handleOptionChange("C", e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="optionD">Option D</Label>
              <Input
                type="text"
                id="optionD"
                value={newQuestion.options.D}
                onChange={(e) => handleOptionChange("D", e.target.value)}
              />
            </FormGroup>
          </Form>
          <Button color="primary" onClick={handleAddQuestion}>
            Add Question
          </Button>
          <div>
            <h3>Questions:</h3>
            <ul>
              {examData.questionSet.map((question, index) => (
                <li key={index}>{question.questionText}</li>
              ))}
            </ul>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleAddExam}>
            Add Exam
          </Button>
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default ExamPage;
