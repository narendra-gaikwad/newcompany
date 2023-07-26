// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./App";

// ReactDOM.render(<App />, document.getElementById("root"));

import React from "react";
import ReactDOM from "react-dom";
import * as ReactDOMClient from "react-dom";
import App from "./App";

const container = document.getElementById("root");
const root = ReactDOMClient.createRoot(container);
root.render(<App />);
