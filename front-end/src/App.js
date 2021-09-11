import axios from "axios";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import api from "./util/apiCalls";
import Booked from "./Pages/Booked.js";
import Dashboard from "./Pages/Dashboard.js";
import Event from "./Pages/EventPage";
import Favorites from "./Pages/Favorites.js";
import Landing from "./Pages/Landing.js";
import SignUp from "./Pages/SignUp.js";
import VendorIndex from "./Pages/VendorIndex.js";
import VendorShow from "./Pages/VendorShow.js";
import Login from "./Components/Login";
import { AuthProvider } from "./Components/Auth";
import PrivateRoute from "./Components/PrivateRoute";
import Test from "./Pages/Test";
import "./App.css";

function App() {
  return (
    <div>
      {/* <AuthProvider>
        <Router> */}
          <Switch>
            <Route exact path="/">
              <Landing />
            </Route>

            <Route path="/login">
              <Login />
            </Route>

            <Route path="/signup">
              <SignUp />
            </Route>

            <Route path="/dashboard/:user_id">
              <Dashboard />
            </Route>

            <Route path="/event/:user_id/:event_id">
              <Event />
            </Route>

            <Route path="/vendor/:category/:provider_id">
              <VendorShow />
            </Route>

            <Route path="/favorites/:user_id">
              <Favorites />
            </Route>

            <Route path="/vendors/:category">
              <VendorIndex />
              {/* <Test /> */}
            </Route>

            <Route path="/booked/:user_id/:event_id">
              <Booked />
            </Route>
          </Switch>
        {/* </Router>
      </AuthProvider> */}
    </div>
  );
}

export default App;
