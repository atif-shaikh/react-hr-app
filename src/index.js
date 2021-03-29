import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { DataProvider } from "./context/dataContext";

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Router>
        <DataProvider>
          <App />
        </DataProvider>
      </Router>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
