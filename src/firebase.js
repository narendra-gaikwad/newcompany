import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyCgZ3THqa33NH7__NexYL-FI9BhMB5LNrE",
  authDomain: "star-easy-learning-a3211.firebaseapp.com",
  projectId: "star-easy-learning-a3211",
  storageBucket: "star-easy-learning-a3211.appspot.com",
  messagingSenderId: "667850309604",
  appId: "1:667850309604:web:22064b3479d5afd17a11f1",
};

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);

export default firebaseApp;
