import React, { useEffect, useState } from "react";
import { firebaseApp } from "../firebase"; // Import firebaseApp using curly braces
import "firebase/firestore";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = firebaseApp
      .firestore()
      .collection("users")
      .doc(firebaseApp.auth().currentUser.uid) // Use firebaseApp here
      .onSnapshot((doc) => {
        setUserData(doc.data());
      });

    return () => unsubscribe();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Welcome, {userData.name}!</h2>
      <p>Email: {userData.email}</p>
    </div>
  );
};

export default Dashboard;
