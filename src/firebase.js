import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD4wrkJxwgOQe6Uttas0rmCs9fuFbr8Lfo",
  authDomain: "star-easy-learning-d1028.firebaseapp.com",
  projectId: "star-easy-learning-d1028",
  storageBucket: "star-easy-learning-d1028.appspot.com",
  messagingSenderId: "1053796837735",
  appId: "1:1053796837735:web:45a874b79dfc5cdc3067c2",
};

const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
export const storage = getStorage(firebaseApp);

export { firebaseApp, firestore };
