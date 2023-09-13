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
      console.log("Video URL to delete:", videoURL);
      const chapterRef = doc(classRef, chapterId);
      await deleteDoc(chapterRef);

      const storageRef = ref(storage, videoURL);
      await deleteObject(storageRef);
    } catch (error) {}
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
      });

      setShowAdditionalForm(false);
    } catch (error) {}
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
                      <div className="video-container">
                        <div className="video-wrapper">
                          <video
                            controls
                            src={chapter.chapterData.videoURL}
                            className="small-video"
                            height={50}
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
                                  chapter.chapterData.videoURL
                                )
                              }
                            >
                              Delete
                            </Button>
                          )}
                          <h3>Teacher Name: {chapter.chapterData.name}</h3>
                          <h3>
                            Chapter Name: {chapter.chapterData.chaptername}
                          </h3>
                          <p>Description: {chapter.chapterData.description}</p>
                          <p>Class: {chapter.chapterData.selectedClass}</p>
                          <p>Subject: {chapter.chapterData.selectedSubject}</p>
                          <p>Date: {chapter.chapterData.date}</p>
                        </div>
                      </div>
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
