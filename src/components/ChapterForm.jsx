// import React, { useState, useEffect } from "react";
// import AdditionalChapterForm from "./AdditionalChapterForm";
// import { collection, onSnapshot, addDoc } from "firebase/firestore";
// import { firestore } from "../firebase";

// const ChapterForm = ({ selectedClass, selectedSubject, onCloseForm }) => {
//   const [chapterName, setChapterName] = useState("");
//   const [showAdditionalForm, setShowAdditionalForm] = useState(false);
//   const [description, setDescription] = useState("");
//   const [submittedChapters, setSubmittedChapters] = useState([]);

//   useEffect(() => {
//     const chaptersCollectionRef = collection(firestore, "chapters");
//     const unsubscribe = onSnapshot(chaptersCollectionRef, (snapshot) => {
//       const chaptersData = [];
//       snapshot.forEach((doc) => {
//         chaptersData.push({ id: doc.id, ...doc.data() });
//       });
//       setSubmittedChapters(chaptersData);
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   const handleAdditionalFormSubmit = async (
//     chapterName,
//     description,
//     videoURL
//   ) => {
//     setSubmittedChapters([
//       ...submittedChapters,
//       { name: chapterName, description, videoURL },
//     ]);

//     try {
//       const chaptersCollectionRef = collection(firestore, "chapters");
//       await addDoc(chaptersCollectionRef, {
//         name: chapterName,
//         description,
//         videoURL,
//       });

//       setShowAdditionalForm(false);
//     } catch (error) {
//       console.error("Error adding document:", error);
//     }
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
import useAuth from "../actions/useAuth";
const ChapterForm = ({ selectedClass, selectedSubject, onCloseForm }) => {
  const [chapterName, setChapterName] = useState("");
  const [showAdditionalForm, setShowAdditionalForm] = useState(false);
  const [description, setDescription] = useState("");
  const [submittedChapters, setSubmittedChapters] = useState([]);

  const user = useAuth(); // Get the logged-in user object from the useAuth hook
  
  useEffect(() => {
    const chaptersCollectionRef = collection(firestore, "chapters");
    const unsubscribe = onSnapshot(chaptersCollectionRef, (snapshot) => {
      const chaptersData = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        // Check if the video belongs to the currently logged-in user
        if (data.userID === (user ? user.uid : null)) {
          chaptersData.push({ id: doc.id, ...data });
        }
      });
      setSubmittedChapters(chaptersData);
    });

    return () => {
      unsubscribe();
    };
  }, [user]); // Add the user object as a dependency to refetch videos when the user changes
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
        userID, // Store the user's ID along with the video data
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
