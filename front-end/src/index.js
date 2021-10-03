import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import { UserProvider } from "./Providers/UserProvider";


ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
       {/* <BrowserRouter> */}
      <App />
    {/* </BrowserRouter> */}
    </UserProvider>
   
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();