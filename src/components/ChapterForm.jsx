

import React, { useState } from "react";
import AdditionalChapterForm from "./AdditionalChapterForm";

const ChapterForm = ({ selectedClass, selectedSubject, onCloseForm }) => {
  const [chapterName, setChapterName] = useState("");
  const [showAdditionalForm, setShowAdditionalForm] = useState(false);
  const [description, setDescription] = useState("");
  const [submittedChapters, setSubmittedChapters] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    // For example, add a new chapter with video
    console.log("Chapter Name:", chapterName);
    console.log("Description:", description);

    // Append the new chapter data to the submittedChapters list
    setSubmittedChapters([
      ...submittedChapters,
      { name: chapterName, description },
    ]);

    // Reset the form fields
    setChapterName("");
    setDescription("");
  };

  const handleAdditionalFormSubmit = (chapterName, description) => {
    // Append the new chapter data to the submittedChapters list
    setSubmittedChapters([
      ...submittedChapters,
      { name: chapterName, description },
    ]);

    // Close the additional form after submission
    setShowAdditionalForm(false);
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

      {/* Display the name and description after form submission */}
      {submittedChapters.map((chapter, index) => (
        <div key={index} className="form-data">
          <h3>Name: {chapter.name}</h3>
          <p>Description: {chapter.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ChapterForm;
