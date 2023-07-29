import React, { useState } from "react";
import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const AdditionalChapterForm = ({ onSubmit }) => {
  const [chapterName, setChapterName] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (videoFile == null) return;

    // Generate a unique name for the video file using v4() from uuid
    const videoFileName = videoFile.name + v4();

    // Upload the video file to Firebase Storage
    const videoRef = ref(storage, `videos/${videoFileName}`);
    const uploadTask = uploadBytesResumable(videoRef, videoFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Handle progress updates
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        // Handle errors during upload if needed
        console.error("Error uploading video:", error);
      },
      async () => {
        // Upload completed successfully
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        // Pass the form data to the parent component using the onSubmit callback
        onSubmit(chapterName, description, downloadURL);
        setUploadProgress(0); // Reset the upload progress
      }
    );
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
      <div className="form-group">
        <label htmlFor="videoFile">Upload Video:</label>
        <input
          type="file"
          id="videoFile"
          accept="video/*"
          onChange={(e) => setVideoFile(e.target.files[0])}
        />
      </div>
      {uploadProgress > 0 && (
        <div className="progress-bar">
          <div
            className="progress"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};

export default AdditionalChapterForm;

// import React, { useState } from "react";
// import { storage } from "../firebase";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { v4 } from "uuid";
// import "firebase/auth";
// import { auth } from "../firebase"; // Import the useAuth hook to get the logged-in user's ID

// const AdditionalChapterForm = ({ onSubmit }) => {
//   const { user } = auth(); // Get the logged-in user object from the useAuth hook

//   const [chapterName, setChapterName] = useState("");
//   const [description, setDescription] = useState("");
//   const [videoFile, setVideoFile] = useState(null);
//   const [uploadProgress, setUploadProgress] = useState(0);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (videoFile == null) return;

//     const userID = user ? user.uid : null; // Get the user's ID or set it to null if no user is logged in

//     // Generate a unique name for the video file using v4() from uuid
//     const videoFileName = videoFile.name + v4();

//     // Upload the video file to Firebase Storage
//     const videoRef = ref(storage, `videos/${videoFileName}`);
//     const uploadTask = uploadBytesResumable(videoRef, videoFile);

//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         // Handle progress updates
//         const progress =
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         setUploadProgress(progress);
//       },
//       (error) => {
//         // Handle errors during upload if needed
//         console.error("Error uploading video:", error);
//       },
//       async () => {
//         // Upload completed successfully
//         const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

//         // Pass the form data to the parent component using the onSubmit callback
//         onSubmit(chapterName, description, downloadURL);
//         setUploadProgress(0); // Reset the upload progress
//       }
//     );
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="form-group">
//         <label htmlFor="chapterName">Chapter Name:</label>
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
