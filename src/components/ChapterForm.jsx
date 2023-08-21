// import React, { useState, useEffect } from "react";
// import {
//   collection,
//   onSnapshot,
//   addDoc,
//   deleteDoc,
//   doc,
// } from "firebase/firestore";
// import { firestore, auth } from "../firebase";
// import AdditionalChapterForm from "./AdditionalChapterForm";

// const ChapterForm = ({ selectedClass, selectedSubject, onCloseForm }) => {
//   const [showAdditionalForm, setShowAdditionalForm] = useState(false);
//   const [submittedChapters, setSubmittedChapters] = useState([]);

//   const chaptersCollectionRef = collection(
//     firestore,
//     selectedClass,
//     selectedSubject,
//     "chapters"
//   );

//   useEffect(() => {
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
//   }, [selectedClass, selectedSubject]);

//   const handleDeleteChapter = async (chapterId) => {
//     try {
//       const chapterRef = doc(chaptersCollectionRef, chapterId);
//       await deleteDoc(chapterRef);
//     } catch (error) {
//       console.error("Error deleting chapter:", error);
//     }
//   };

//   const handleAdditionalFormSubmit = async (
//     chapterName,
//     description,
//     videoURL
//   ) => {
//     try {
//       const chaptersCollectionRef = collection(
//         firestore,
//         selectedClass,
//         selectedSubject,
//         "chapters"
//       );

//       await addDoc(chaptersCollectionRef, {
//         name: chapterName,
//         description,
//         selectedSubject,
//         selectedClass,
//         videoURL,
//         createdBy: auth.currentUser.uid,
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
//         <AdditionalChapterForm
//           selectedClass={selectedClass}
//           selectedSubject={selectedSubject}
//           onSubmit={handleAdditionalFormSubmit}
//         />
//       ) : (
//         <button onClick={() => setShowAdditionalForm(true)}>ADD VIDEO</button>
//       )}

//       {submittedChapters.map((chapter) => (
//         <div key={chapter.id} className="form-data">
//           <h3>Teacher Name: {chapter.name}</h3>
//           <p>Description: {chapter.description}</p>
//           <p>Class: {chapter.selectedClass}</p>
//           <p>Subject: {chapter.selectedSubject}</p>
//           {chapter.videoURL && (
//             <div>
//               {auth.currentUser &&
//                 auth.currentUser.uid === chapter.createdBy && (
//                   <button onClick={() => handleDeleteChapter(chapter.id)}>
//                     Delete
//                   </button>
//                 )}
//               <video
//                 controls
//                 src={chapter.videoURL}
//                 className="small-video"
//                 height={200}
//                 width={300}
//               ></video>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ChapterForm;

// import React, { useState, useEffect } from "react";
// import {
//   collection,
//   onSnapshot,
//   addDoc,
//   deleteDoc,
//   doc,
// } from "firebase/firestore";
// import { firestore, auth } from "../firebase";
// import AdditionalChapterForm from "./AdditionalChapterForm";
// import { Button } from "reactstrap";

// const ChapterForm = ({
//   selectedClass,
//   selectedSubject,
//   onCloseForm,
//   onBackToVideos,
// }) => {
//   const [showAdditionalForm, setShowAdditionalForm] = useState(false);
//   const [submittedChapters, setSubmittedChapters] = useState([]);

//   const classRef = collection(
//     firestore,
//     "video",
//     selectedClass,
//     selectedSubject
//   );

//   useEffect(() => {
//     const unsubscribe = onSnapshot(classRef, (snapshot) => {
//       const chaptersData = [];
//       snapshot.forEach((doc) => {
//         chaptersData.push({ id: doc.id, ...doc.data() });
//       });
//       setSubmittedChapters(chaptersData);
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, [selectedClass, selectedSubject]);

//   const handleDeleteChapter = async (chapterId) => {
//     try {
//       const chapterRef = doc(classRef, chapterId);
//       await deleteDoc(chapterRef);
//     } catch (error) {
//       console.error("Error deleting chapter:", error);
//     }
//   };

//   const handleAdditionalFormSubmit = async (chapterData) => {
//     try {
//       const chaptersCollectionRef = collection(
//         firestore,
//         "video",
//         selectedClass,
//         selectedSubject
//       );

//       await addDoc(chaptersCollectionRef, {
//         ...chapterData,
//         createdBy: auth.currentUser.uid,
//       });

//       setShowAdditionalForm(false);
//     } catch (error) {
//       console.error("Error adding document:", error);
//     }
//   };

//   return (
//     <div className="chapter-form">
//       <Button className="primary" onClick={onBackToVideos}>
//         Back
//       </Button>
//       {showAdditionalForm ? (
//         <AdditionalChapterForm
//           selectedClass={selectedClass}
//           selectedSubject={selectedSubject}
//           onSubmit={handleAdditionalFormSubmit}
//         />
//       ) : (
//         <button onClick={() => setShowAdditionalForm(true)}>ADD VIDEO</button>
//       )}
//       <h2>Chapter Form</h2>
//       <h4>Selected Class: {selectedClass}</h4>
//       <h5>Selected Subject: {selectedSubject}</h5>

//       {submittedChapters.map((chapter) => (
//         <div key={chapter.id} className="form-data">
//           <h3>Teacher Name: {chapter.name}</h3>
//           <p>Description: {chapter.description}</p>
//           <p>Class: {selectedClass}</p>
//           <p>Subject: {selectedSubject}</p>
//           {chapter.videoURL && (
//             <div>
//               {auth.currentUser &&
//                 auth.currentUser.uid === chapter.createdBy && (
//                   <button onClick={() => handleDeleteChapter(chapter.id)}>
//                     Delete
//                   </button>
//                 )}
//               <video
//                 controls
//                 src={chapter.videoURL}
//                 className="small-video"
//                 height={200}
//                 width={300}
//               ></video>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ChapterForm;

////////

// import React, { useState, useEffect } from "react";
// import {
//   collection,
//   onSnapshot,
//   addDoc,
//   deleteDoc,
//   doc,
// } from "firebase/firestore";
// import { firestore, auth } from "../firebase";
// import AdditionalChapterForm from "./AdditionalChapterForm";
// import { Button } from "reactstrap";
// import "./ChapterForm.css"; // Import your custom CSS file

// const ChapterForm = ({
//   selectedClass,
//   selectedSubject,
//   onCloseForm,
//   onBackToVideos,
// }) => {
//   const [showAdditionalForm, setShowAdditionalForm] = useState(false);
//   const [submittedChapters, setSubmittedChapters] = useState([]);
//   const classRef = collection(
//     firestore,
//     "video",
//     selectedClass,
//     selectedSubject
//   );

//   useEffect(() => {
//     const unsubscribe = onSnapshot(classRef, (snapshot) => {
//       const chaptersData = [];
//       snapshot.forEach((doc) => {
//         chaptersData.push({ id: doc.id, ...doc.data() });
//       });
//       setSubmittedChapters(chaptersData);
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, [selectedClass, selectedSubject]);

//   const handleDeleteChapter = async (chapterId) => {
//     try {
//       const chapterRef = doc(classRef, chapterId);
//       await deleteDoc(chapterRef);
//     } catch (error) {
//       console.error("Error deleting chapter:", error);
//     }
//   };

//   const handleAdditionalFormSubmit = async (chapterData) => {
//     try {
//       const chaptersCollectionRef = collection(
//         firestore,
//         "video",
//         selectedClass,
//         selectedSubject
//       );

//       await addDoc(chaptersCollectionRef, {
//         ...chapterData,
//         createdBy: auth.currentUser.uid,
//       });

//       setShowAdditionalForm(false);
//     } catch (error) {
//       console.error("Error adding document:", error);
//     }
//   };

//   return (
//     <div className="chapter-form">
//       <Button className="back" color="primary" onClick={onBackToVideos}>
//         Back
//       </Button>
//       {showAdditionalForm ? (
//         <AdditionalChapterForm
//           selectedClass={selectedClass}
//           selectedSubject={selectedSubject}
//           onSubmit={handleAdditionalFormSubmit}
//         />
//       ) : (
//         <Button
//           className="add-video-button"
//           color="success"
//           onClick={() => setShowAdditionalForm(true)}
//         >
//           ADD VIDEO
//         </Button>
//       )}
//       {/* <h2 className="form-title">Chapter Form</h2>
//       <h4>Selected Class: {selectedClass}</h4>
//       <h5>Selected Subject: {selectedSubject}</h5> */}

//       <div className="chapter-grid">
//         {submittedChapters.map((chapter) => (
//           <div key={chapter.id} className="chapter">
//             <h3>Teacher Name: {chapter.name}</h3>
//             <p>Description: {chapter.description}</p>
//             <p>Class: {selectedClass}</p>
//             <p>Subject: {selectedSubject}</p>
//             {chapter.videoURL && (
//               <div className="video-container">
//                 {auth.currentUser &&
//                   auth.currentUser.uid === chapter.createdBy && (
//                     <Button
//                       className="delete-button"
//                       color="danger"
//                       onClick={() => handleDeleteChapter(chapter.id)}
//                     >
//                       Delete
//                     </Button>
//                   )}
//                 <video
//                   controls
//                   src={chapter.videoURL}
//                   className="small-video"
//                   height={100}
//                   width={150}
//                 ></video>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// // export default ChapterForm;

// import React, { useState, useEffect } from "react";
// import {
//   collection,
//   onSnapshot,
//   addDoc,
//   deleteDoc,
//   doc,
// } from "firebase/firestore";
// import { firestore, auth } from "../firebase";
// import AdditionalChapterForm from "./AdditionalChapterForm";
// import { Button } from "reactstrap";
// import "./ChapterForm.css"; // Import your custom CSS file

// const ChapterForm = ({
//   selectedClass,
//   selectedSubject,
//   onCloseForm,
//   onBackToVideos,
// }) => {
//   const [showAdditionalForm, setShowAdditionalForm] = useState(false);
//   const [submittedChapters, setSubmittedChapters] = useState([]);
//   const classRef = collection(
//     firestore,
//     "video",
//     selectedClass,
//     selectedSubject
//   );

//   useEffect(() => {
//     const unsubscribe = onSnapshot(classRef, (snapshot) => {
//       const chaptersData = [];
//       snapshot.forEach((doc) => {
//         chaptersData.push({ id: doc.id, ...doc.data() });
//       });
//       setSubmittedChapters(chaptersData);
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, [selectedClass, selectedSubject]);

//   const handleDeleteChapter = async (chapterId) => {
//     try {
//       const chapterRef = doc(classRef, chapterId);
//       await deleteDoc(chapterRef);
//     } catch (error) {
//       console.error("Error deleting chapter:", error);
//     }
//   };

//   const handleAdditionalFormSubmit = async (chapterData) => {
//     try {
//       const chaptersCollectionRef = collection(
//         firestore,
//         "video",
//         selectedClass,
//         selectedSubject
//       );

//       await addDoc(chaptersCollectionRef, {
//         ...chapterData,
//         createdBy: auth.currentUser.uid,
//       });

//       setShowAdditionalForm(false);
//     } catch (error) {
//       console.error("Error adding document:", error);
//     }
//   };

//   const videosPerRow = 3; // Number of videos per row

//   return (
//     <div className="chapter-form">
//       <Button className="back-button" color="primary" onClick={onBackToVideos}>
//         Back
//       </Button>
//       {showAdditionalForm ? (
//         <AdditionalChapterForm
//           selectedClass={selectedClass}
//           selectedSubject={selectedSubject}
//           onSubmit={handleAdditionalFormSubmit}
//         />
//       ) : (
//         <Button
//           className="add-video-button"
//           color="success"
//           onClick={() => setShowAdditionalForm(true)}
//         >
//           ADD VIDEO
//         </Button>
//       )}

//       <div className="video-table">
//         <table>
//           <tbody>
//             {Array.from({
//               length: Math.ceil(submittedChapters.length / videosPerRow),
//             }).map((_, rowIndex) => (
//               <tr key={rowIndex}>
//                 {submittedChapters
//                   .slice(rowIndex * videosPerRow, (rowIndex + 1) * videosPerRow)
//                   .map((chapter) => (
//                     <td key={chapter.id} className="video-cell">
//                       {chapter.videoURL && (
//                         <div className="video-container">
//                           <video
//                             controls
//                             src={chapter.videoURL}
//                             className="small-video"
//                             height={100}
//                             width={150}
//                           ></video>
//                         </div>
//                       )}
//                     </td>
//                   ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ChapterForm;

import React, { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { firestore, auth } from "../firebase";
import AdditionalChapterForm from "./AdditionalChapterForm";
import { Button } from "reactstrap";
import "./ChapterForm.css"; // Import your custom CSS file

const ChapterForm = ({
  selectedClass,
  selectedSubject,
  onCloseForm,
  onBackToVideos,
}) => {
  const [showAdditionalForm, setShowAdditionalForm] = useState(false);
  const [submittedChapters, setSubmittedChapters] = useState([]);
  const classRef = collection(
    firestore,
    "video",
    selectedClass,
    selectedSubject
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(classRef, (snapshot) => {
      const chaptersData = [];
      snapshot.forEach((doc) => {
        chaptersData.push({ id: doc.id, ...doc.data() });
      });
      setSubmittedChapters(chaptersData);
    });

    return () => {
      unsubscribe();
    };
  }, [selectedClass, selectedSubject]);

  const handleDeleteChapter = async (chapterId) => {
    try {
      const chapterRef = doc(classRef, chapterId);
      await deleteDoc(chapterRef);
    } catch (error) {
      console.error("Error deleting chapter:", error);
    }
  };

  const handleAdditionalFormSubmit = async (chapterData) => {
    try {
      const chaptersCollectionRef = collection(
        firestore,
        "video",
        selectedClass,
        selectedSubject
      );

      await addDoc(chaptersCollectionRef, {
        ...chapterData,
        createdBy: auth.currentUser.uid,
      });

      setShowAdditionalForm(false);
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };
  const handleCancelAdditionalForm = () => {
    setShowAdditionalForm(false);
  };
  const videosPerRow = 3; // Number of videos per row

  return (
    <div className="chapter-form">
      <div className="button-container">
        <Button
          className="back-button"
          color="primary"
          onClick={onBackToVideos}
        >
          Back
        </Button>
        <div>
          {showAdditionalForm ? (
            <AdditionalChapterForm
              selectedClass={selectedClass}
              selectedSubject={selectedSubject}
              onSubmit={handleAdditionalFormSubmit}
              onCancel={handleCancelAdditionalForm}
            />
          ) : (
            <Button
              className="add-video-button"
              color="success"
              onClick={() => setShowAdditionalForm(true)}
            >
              ADD
            </Button>
          )}
        </div>
      </div>

      <div className="video-table">
        <table>
          <tbody>
            {Array.from({
              length: Math.ceil(submittedChapters.length / videosPerRow),
            }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {submittedChapters
                  .slice(rowIndex * videosPerRow, (rowIndex + 1) * videosPerRow)
                  .map((chapter) => (
                    <td key={chapter.id} className="video-cell">
                      {chapter.videoURL && (
                        <div className="video-container">
                          <div className="video-wrapper">
                            <video
                              controls
                              src={chapter.videoURL}
                              className="small-video"
                              height={100}
                              width={150}
                            ></video>
                          </div>
                          <div className="chapter-info">
                            <h3>Teacher Name: {chapter.name}</h3>
                            <p>Description: {chapter.description}</p>
                            <p>Class: {selectedClass}</p>
                            <p>Subject: {selectedSubject}</p>
                          </div>
                        </div>
                      )}
                    </td>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChapterForm;
