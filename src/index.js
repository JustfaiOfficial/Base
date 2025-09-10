import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";   // 👈 extension added
import reportWebVitals from "./reportWebVitals.js";  // 👈 extension added

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
