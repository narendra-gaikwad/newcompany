import { firebaseApp } from "../firebase"; // Import firebaseApp using curly braces {}
import { userLoggedIn, userLoggedOut, authError } from "../reducers/authSlice";

export const registerUser = (email, password) => async (dispatch) => {
  try {
    await firebaseApp.auth().createUserWithEmailAndPassword(email, password); // Use firebaseApp here
    const user = firebaseApp.auth().currentUser; // Use firebaseApp here
    dispatch(userLoggedIn(user));
  } catch (error) {
    dispatch(authError(error.message));
  }
};

export const loginUser = (email, password) => async (dispatch) => {
  try {
    await firebaseApp.auth().signInWithEmailAndPassword(email, password); // Use firebaseApp here
    const user = firebaseApp.auth().currentUser; // Use firebaseApp here
    dispatch(userLoggedIn(user));
  } catch (error) {
    dispatch(authError(error.message));
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    await firebaseApp.auth().signOut(); // Use firebaseApp here
    dispatch(userLoggedOut());
  } catch (error) {
    dispatch(authError(error.message));
  }
};
