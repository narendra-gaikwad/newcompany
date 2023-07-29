import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import rootReducer from "./reducers/rootReducer";
import { configureStore } from "@reduxjs/toolkit";
import Dashboard from "./components/Dashboard";

const store = configureStore({
  reducer: rootReducer,
});

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
