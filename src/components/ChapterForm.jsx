import React, { useState, useEffect } from "react";
import AdditionalChapterForm from "./AdditionalChapterForm";
import { collection, onSnapshot, addDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import "firebase/auth";
import useAuth from "../actions/useAuth";

const ChapterForm = ({ selectedClass, selectedSubject, onCloseForm }) => {
  const [chapterName, setChapterName] = useState("");
  const [showAdditionalForm, setShowAdditionalForm] = useState(false);
  const [description, setDescription] = useState("");
  const [submittedChapters, setSubmittedChapters] = useState([]);

  const user = useAuth();

  useEffect(() => {
    const chaptersCollectionRef = collection(firestore, "chapters");
    const unsubscribe = onSnapshot(chaptersCollectionRef, (snapshot) => {
      const chaptersData = [];
      snapshot.forEach((doc) => {
        const data = doc.data();

        if (data.userID === (user ? user.uid : null)) {
          if (
            data.class === selectedClass &&
            data.subject === selectedSubject
          ) {
            chaptersData.push({ id: doc.id, ...data });
          }
        }
      });
      setSubmittedChapters(chaptersData);
    });

    return () => {
      unsubscribe();
    };
  }, [user, selectedClass, selectedSubject]);

  const handleAdditionalFormSubmit = async (
    chapterName,
    description,
    videoURL,
    userID
  ) => {
    setSubmittedChapters([
      ...submittedChapters,
      {
        name: chapterName,
        description,
        videoURL,
        userID,
        class: selectedClass,
        subject: selectedSubject,
      },
    ]);

    try {
      const chaptersCollectionRef = collection(firestore, "chapters");
      await addDoc(chaptersCollectionRef, {
        name: chapterName,
        description,
        videoURL,
        userID,
        class: selectedClass,
        subject: selectedSubject,
      });

      setShowAdditionalForm(false);
      setChapterName("");
      setDescription("");
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
          <h1>Previous Chapters</h1>
          <h3>Teacher Name: {chapter.name}</h3>
          <p>Description: {chapter.description}</p>
          {chapter.videoURL && (
            <video
              controls
              src={chapter.videoURL}
              className="small-video"
              height={500}
              width={500}
            ></video>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChapterForm;
