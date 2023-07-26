// store.js
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducers/rootReducer"; // Import your rootReducer here

const store = configureStore({
  reducer: rootReducer,
});

export default store;
