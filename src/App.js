import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import rootReducer from "./reducers/rootReducer";
import { configureStore } from "@reduxjs/toolkit";
import Dashboard from "./components/Dashboard";
import ProfessorTable from "./components/ProfessorTable";
import "./assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/scss/argon-dashboard-react.scss";
import LeftSideMenu from "./components/LeftSideMenu";
import MyNavbar from "./components/MyNavbar";
import AllProductsList from "./components/AllProductsList";
import AddProduct from "./components/AddProduct";

const store = configureStore({
  reducer: rootReducer,
});

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          {/* <MyNavbar />
          <LeftSideMenu /> */}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/all-product-list" element={<AllProductsList />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/professorTable" element={<ProfessorTable />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
