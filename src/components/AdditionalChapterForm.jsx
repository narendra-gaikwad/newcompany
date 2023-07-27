import React, { useState } from "react";

const AdditionalChapterForm = ({ onSubmit }) => {
  const [chapterName, setChapterName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the form data to the parent component using the onSubmit callback
    onSubmit(chapterName, description);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="chapterName">Chapter Name:</label>
        <input
          type="text"
          id="chapterName"
          value={chapterName}
          onChange={(e) => setChapterName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AdditionalChapterForm;
