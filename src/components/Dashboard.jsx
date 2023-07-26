import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from "../firebase"

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUserData(user);
      else setUserData(null);
    });
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>Channel to welcome : {userData.email}</p>
    </div>
  );
};

export default Dashboard;
