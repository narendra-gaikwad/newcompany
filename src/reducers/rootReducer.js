import { combineReducers } from "redux";
import formSliceReducer from "./formSlice";
import authReducer from "./authSlice";

const rootReducer = combineReducers({
  form: formSliceReducer,
  auth: authReducer,
});

export default rootReducer;
