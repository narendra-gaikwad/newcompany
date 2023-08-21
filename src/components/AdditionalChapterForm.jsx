// import React, { useState } from "react";
// import { storage } from "../firebase";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { v4 } from "uuid";
// import "firebase/auth";
// import useAuth from "../actions/useAuth";

// const AdditionalChapterForm = ({ onSubmit }) => {
//   const user = useAuth();

//   const [chapterName, setChapterName] = useState("");
//   const [description, setDescription] = useState("");
//   const [videoFile, setVideoFile] = useState(null);
//   const [uploadProgress, setUploadProgress] = useState(0);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (
//       videoFile == null ||
//       chapterName.trim() === "" ||
//       description.trim() === ""
//     ) {
//       return;
//     }

//     const userID = user ? user.uid : null;

//     const videoFileName = v4() + videoFile.name;

//     const videoRef = ref(storage, `videos/${videoFileName}`);
//     const uploadTask = uploadBytesResumable(videoRef, videoFile);

//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         const progress =
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         setUploadProgress(progress);
//       },
//       (error) => {
//         console.error("Error uploading video:", error);
//       },
//       async () => {
//         const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

//         // onSubmit(chapterName, description, downloadURL, userID);
//         onSubmit(chapterName, description, downloadURL);
//         setUploadProgress(0);
//         setChapterName("");
//         setDescription("");
//         setVideoFile(null);
//       }
//     );
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="form-group">
//         <label htmlFor="chapterName">Teacher Name:</label>
//         <input
//           type="text"
//           id="chapterName"
//           value={chapterName}
//           onChange={(e) => setChapterName(e.target.value)}
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="description">Description:</label>
//         <textarea
//           id="description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="videoFile">Upload Video:</label>
//         <input
//           type="file"
//           id="videoFile"
//           accept="video/*"
//           onChange={(e) => setVideoFile(e.target.files[0])}
//         />
//       </div>
//       {uploadProgress > 0 && (
//         <div className="progress-bar">
//           <div
//             className="progress"
//             style={{ width: `${uploadProgress}%` }}
//           ></div>
//         </div>
//       )}
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default AdditionalChapterForm;

// import React, { useState } from "react";
// import { storage } from "../firebase";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { v4 } from "uuid";

// const AdditionalChapterForm = ({
//   selectedClass,
//   selectedSubject,
//   onSubmit,
// }) => {
//   const [chapterName, setChapterName] = useState("");
//   const [description, setDescription] = useState("");
//   const [videoFile, setVideoFile] = useState(null);
//   const [uploadProgress, setUploadProgress] = useState(0);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (videoFile == null) return;

//     const videoFileName = videoFile.name + v4();

//     const videoRef = ref(
//       storage,
//       `${selectedClass}/${selectedSubject}/${videoFileName}`
//     );
//     const uploadTask = uploadBytesResumable(videoRef, videoFile);

//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         const progress =
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         setUploadProgress(progress);
//       },
//       (error) => {
//         console.error("Error uploading video:", error);
//       },
//       async () => {
//         const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

//         onSubmit(
//           chapterName,
//           description,
//           downloadURL,
//           selectedClass,
//           selectedSubject
//         );
//         setUploadProgress(0);
//       }
//     );
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="form-group">
//         <label htmlFor="chapterName">Teacher Name:</label>
//         <input
//           type="text"
//           id="chapterName"
//           value={chapterName}
//           onChange={(e) => setChapterName(e.target.value)}
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="description">Description:</label>
//         <textarea
//           id="description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="videoFile">Upload Video:</label>
//         <input
//           type="file"
//           id="videoFile"
//           accept="video/*"
//           onChange={(e) => setVideoFile(e.target.files[0])}
//         />
//       </div>
//       {uploadProgress > 0 && (
//         <div className="progress-bar">
//           <div
//             className="progress"
//             style={{ width: `${uploadProgress}%` }}
//           ></div>
//         </div>
//       )}
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default AdditionalChapterForm;

// import React, { useState } from "react";
// import { storage } from "../firebase";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { v4 } from "uuid";
// import "./AdditionalChapterForm.css"; // Import your custom CSS file

// const AdditionalChapterForm = ({
//   selectedClass,
//   selectedSubject,
//   onSubmit,
//   onCancel,
// }) => {
//   const [chapterName, setChapterName] = useState("");
//   const [description, setDescription] = useState("");
//   const [videoFile, setVideoFile] = useState(null);
//   const [uploadProgress, setUploadProgress] = useState(0);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (videoFile == null) return;

//     const videoFileName = videoFile.name + v4();

//     const videoRef = ref(
//       storage,
//       `video/${selectedClass}/${selectedSubject}/${videoFileName}`
//     );
//     const uploadTask = uploadBytesResumable(videoRef, videoFile);

//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         const progress =
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         setUploadProgress(progress);
//       },
//       (error) => {
//         console.error("Error uploading video:", error);
//       },
//       async () => {
//         const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

//         onSubmit({
//           name: chapterName,
//           description,
//           videoURL: downloadURL,
//         });
//         setUploadProgress(0);
//       }
//     );
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="form-group">
//         <label htmlFor="chapterName">Teacher Name:</label>
//         <input
//           type="text"
//           id="chapterName"
//           value={chapterName}
//           onChange={(e) => setChapterName(e.target.value)}
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="description">Description:</label>
//         <textarea
//           id="description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="videoFile">Upload Video:</label>
//         <input
//           type="file"
//           id="videoFile"
//           accept="video/*"
//           onChange={(e) => setVideoFile(e.target.files[0])}
//         />
//       </div>
//       {uploadProgress > 0 && (
//         <div className="progress-bar">
//           <div
//             className="progress"
//             style={{ width: `${uploadProgress}%` }}
//           ></div>
//         </div>
//       )}
//       <div className="button-container">
//         <button className="cancel-button" type="button" onClick={onCancel}>
//           Cancel
//         </button>
//         <button className="submit-button" type="submit">
//           Submit
//         </button>
//       </div>
//     </form>
//   );
// };

// export default AdditionalChapterForm;
import React, { useState } from "react";
import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { Card, CardBody, Form, FormGroup, Button } from "reactstrap"; // Import Reactstrap components
import "./AdditionalChapterForm.css"; // Import your custom CSS file

const AdditionalChapterForm = ({
  selectedClass,
  selectedSubject,
  onSubmit,
  onCancel,
}) => {
  const [chapterName, setChapterName] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

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
        console.error("Error uploading video:", error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        onSubmit({
          name: chapterName,
          description,
          videoURL: downloadURL,
        });
        setUploadProgress(0);
      }
    );
  };

  return (
    <Card className="additional-chapter-form-card">
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="chapterName">Teacher Name:</label>
            <input
              type="text"
              id="chapterName"
              value={chapterName}
              onChange={(e) => setChapterName(e.target.value)}
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
            <div className="progress-bar">
              <div
                className="progress"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          )}
          <div className="button-container">
            <Button
              className="cancel-button"
              color="secondary"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button className="submit-button" color="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  );
};

export default AdditionalChapterForm;

