import React, { useState } from "react";
import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { Card, CardBody, Form, FormGroup, Button } from "reactstrap";
import "./AdditionalChapterForm.css";

import { firestore, auth } from "../firebase";

const AdditionalChapterForm = ({
  selectedClass,
  selectedSubject,
  onSubmit,
  onCancel,
}) => {
  const [teacherName, setTeacherName] = useState("");
  const [chapterName, setChapterName] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (videoFile == null) return;

    const videoFileName = videoFile.name + v4();

    const videoRef = ref(
      storage,
      `video/${selectedClass}/${selectedSubject}/${videoFileName}`
    );
    const uploadTask = uploadBytesResumable(videoRef, videoFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        const chapterData = {
          name: teacherName,
          chaptername: chapterName,
          description,
          videoURL: downloadURL,
          date: selectedDate,
          createdBy: auth.currentUser.uid,
          selectedClass,
          selectedSubject,
        };
   
        onSubmit({ chapterData });
        setUploadProgress(0);
      }
    );
  };

  return (
    <Card className="additional-chapter-form-card">
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="teacherName">Teacher Name:</label>
            <input
              type="text"
              id="teacherName"
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
              className="form-control"
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="chapterName">Chapter Name:</label>
            <input
              type="text"
              id="chapterName"
              value={chapterName}
              onChange={(e) => setChapterName(e.target.value)}
              className="form-control"
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="videoDate">Select Date:</label>
            <input
              type="date"
              id="videoDate"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="form-control"
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-control"
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="videoFile">Upload Video:</label>
            <input
              type="file"
              id="videoFile"
              accept="video/*"
              onChange={(e) => setVideoFile(e.target.files[0])}
              className="form-control-file"
            />
          </FormGroup>

          {uploadProgress > 0 && (
            <div className="progress-container">
              <div
                className="progress-bar-container"
                style={{ width: `${Math.min(uploadProgress, 100)}%` }}
              ></div>
            </div>
          )}
          <div className="button-center-container">
            <Button
              className="custom-cancel-button"
              color="danger"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              className="custom-submit-button"
              color="success"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  );
};

export default AdditionalChapterForm;
