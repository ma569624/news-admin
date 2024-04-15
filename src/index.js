import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./css/adminlte.min2167.css";
import { ApiContext } from "./Context/ApiContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
const API = 'http://89.116.20.142:5000'

root.render(
  <React.StrictMode>
    <ApiContext.Provider value={{API}}>
      <App />
    </ApiContext.Provider>
  </React.StrictMode>
);

reportWebVitals();
