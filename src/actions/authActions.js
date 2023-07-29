import { firebaseApp } from "../firebase";
import { userLoggedIn, userLoggedOut, authError } from "../reducers/authSlice";

export const registerUser = (email, password) => async (dispatch) => {
  try {
    await firebaseApp.auth().createUserWithEmailAndPassword(email, password);
    const user = firebaseApp.auth().currentUser;
    dispatch(userLoggedIn(user));
    console.log(user);
  } catch (error) {
    dispatch(authError(error.message));
  }
};

export const loginUser = (email, password) => async (dispatch) => {
  try {
    await firebaseApp.auth().signInWithEmailAndPassword(email, password);
    const user = firebaseApp.auth().currentUser;
    dispatch(userLoggedIn(user));
  } catch (error) {
    dispatch(authError(error.message));
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    await firebaseApp.auth().signOut();
    dispatch(userLoggedOut());
  } catch (error) {
    dispatch(authError(error.message));
  }
};
