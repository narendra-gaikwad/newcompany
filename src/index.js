

import React from "react";
import ReactDOM from "react-dom";
import * as ReactDOMClient from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/scss/argon-dashboard-react.scss";

const container = document.getElementById("root");
const root = ReactDOMClient.createRoot(container);
root.render(<App />);
