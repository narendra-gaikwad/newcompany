import React, { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { firestore, auth, storage } from "../firebase";
import AdditionalChapterForm from "./AdditionalChapterForm";
import { Button } from "reactstrap";
import { deleteObject, ref } from "firebase/storage";
import "./ChapterForm.css";

const ChapterForm = ({
  selectedClass,
  selectedSubject,
  onCloseForm,
  onBackToVideos,
  isAdmin,
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

  const handleDeleteChapter = async (chapterId, videoURL) => {
    try {
      const chapterRef = doc(classRef, chapterId);
      await deleteDoc(chapterRef);

      const storageRef = ref(storage, videoURL);
      await deleteObject(storageRef);
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
        selectedClass,
        selectedSubject,
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

  const videosPerRow = 3;

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
                            {isAdmin && (
                              <Button
                                className="delete-video-button"
                                color="danger"
                                onMouseEnter={(e) =>
                                  (e.target.style.backgroundColor = "#e74c3c")
                                }
                                onMouseLeave={(e) =>
                                  (e.target.style.backgroundColor = "#2ecc71")
                                }
                                onClick={() =>
                                  handleDeleteChapter(
                                    chapter.id,
                                    chapter.videoURL
                                  )
                                }
                              >
                                Delete
                              </Button>
                            )}
                            <h3>Teacher Name: {chapter.name}</h3>
                            <p>Description: {chapter.description}</p>
                            <p>Class: {selectedClass}</p>
                            <p>Subject: {selectedSubject}</p>
                            <p>Date: {chapter.date}</p>
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
