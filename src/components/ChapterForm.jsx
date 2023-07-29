// import React, { useState } from "react";
// import AdditionalChapterForm from "./AdditionalChapterForm";

// const ChapterForm = ({ selectedClass, selectedSubject, onCloseForm }) => {
//   const [chapterName, setChapterName] = useState("");
//   const [showAdditionalForm, setShowAdditionalForm] = useState(false);
//   const [description, setDescription] = useState("");
//   const [submittedChapters, setSubmittedChapters] = useState([]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission logic here
//     // For example, add a new chapter with video
//     console.log("Chapter Name:", chapterName);
//     console.log("Description:", description);

//     // Append the new chapter data to the submittedChapters list
//     setSubmittedChapters([
//       ...submittedChapters,
//       { name: chapterName, description },
//     ]);

//     // Reset the form fields
//     setChapterName("");
//     setDescription("");
//   };

//   const handleAdditionalFormSubmit = (chapterName, description, videoURL) => {
//     // Append the new chapter data to the submittedChapters list
//     setSubmittedChapters([
//       ...submittedChapters,
//       { name: chapterName, description, videoURL },
//     ]);

//     // Close the additional form after submission
//     setShowAdditionalForm(false);
//   };

//   return (
//     <div className="chapter-form">
//       <h2>Chapter Form</h2>
//       <h4>Selected Class: {selectedClass}</h4>
//       <h5>Selected Subject: {selectedSubject}</h5>

//       {showAdditionalForm ? (
//         <AdditionalChapterForm onSubmit={handleAdditionalFormSubmit} />
//       ) : (
//         <button onClick={() => setShowAdditionalForm(true)}>ADD VIDEO</button>
//       )}

//       {/* Display the name, description, and video link after form submission */}
//       {submittedChapters.map((chapter, index) => (
//         <div key={index} className="form-data">
//           <h3>Name: {chapter.name}</h3>
//           <p>Description: {chapter.description}</p>
//           {chapter.videoURL && (
//             <video
//               controls
//               src={chapter.videoURL}
//               className="small-video"
//             ></video>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ChapterForm;

import React, { useState, useEffect } from "react";
import AdditionalChapterForm from "./AdditionalChapterForm";
import {
  collection,
  onSnapshot,
  addDoc,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "../firebase";
import "firebase/auth";
// import { auth } from "../actions/useAuth"; 
import { auth } from "../firebase";
const ChapterForm = ({ selectedClass, selectedSubject, onCloseForm }) => {
  const [chapterName, setChapterName] = useState("");
  const [showAdditionalForm, setShowAdditionalForm] = useState(false);
  const [description, setDescription] = useState("");
  const [submittedChapters, setSubmittedChapters] = useState([]);

  const { user } = auth(); 

  useEffect(() => {
    const chaptersCollectionRef = collection(firestore, "chapters");
    const unsubscribe = onSnapshot(chaptersCollectionRef, (snapshot) => {
      const chaptersData = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
      
        if (data.userID === (user ? user.uid : null)) {
          chaptersData.push({ id: doc.id, ...data });
        }
      });
      setSubmittedChapters(chaptersData);
    });

    return () => {
      unsubscribe();
    };
  }, [user]);
  const handleAdditionalFormSubmit = async (
    chapterName,
    description,
    videoURL,
    userID
  ) => {
    setSubmittedChapters([
      ...submittedChapters,
      { name: chapterName, description, videoURL, userID },
    ]);

    try {
      const chaptersCollectionRef = collection(firestore, "chapters");
      await addDoc(chaptersCollectionRef, {
        name: chapterName,
        description,
        videoURL,
        userID, 
      });

      setShowAdditionalForm(false);
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  return (
    <div className="chapter-form">
      <h2>Chapter Form</h2>
      <h4>Selected Class: {selectedClass}</h4>
      <h5>Selected Subject: {selectedSubject}</h5>

      {showAdditionalForm ? (
        <AdditionalChapterForm onSubmit={handleAdditionalFormSubmit} />
      ) : (
        <button onClick={() => setShowAdditionalForm(true)}>ADD VIDEO</button>
      )}

      {submittedChapters.map((chapter, index) => (
        <div key={index} className="form-data">
          <h3>Name: {chapter.name}</h3>
          <p>Description: {chapter.description}</p>
          {chapter.videoURL && (
            <video
              controls
              src={chapter.videoURL}
              className="small-video"
            ></video>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChapterForm;
