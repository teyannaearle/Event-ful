import axios from "axios";
import { useState, useEffect, useContext } from "react";
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

import "./App.css";
import Login from "./Components/Login";

import { AuthProvider } from "./Components/Auth";
import PrivateRoute from "./Components/PrivateRoute";

function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <Switch>
            <PrivateRoute exact path="/" component={Landing} />
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup" component={SignUp} />
            <Route path="/dashboard">
              <Dashboard />
            </Route>

            <PrivateRoute path="/favorites" component={Favorites} />

            <PrivateRoute path="/event/:event_id" component={Event} />
            
            <Route path="/:category/:provider_id">
              <VendorShow />
            </Route>

            <Route path="/:category">
              <VendorIndex />
            </Route>

            <Route path="/booked/:event_id">
              <Booked />
            </Route>
          </Switch>
        </Router>
      </AuthProvider>

      {/* <Switch>
        <Route exact path="/">
          <Landing />
        </Route>

        <Route path="/signup">
          <SignUp />
        </Route>

        <Route path="/dashboard">
          <Dashboard />
        </Route>
        
        <Route path="/favorites">
          <Favorites />
        </Route>

        <Route path="/event/:event_id">
          <Event />
        </Route>

        <Route path="/:category/:provider_id">
          <VendorShow />
        </Route>

        <Route path="/:category">
          <VendorIndex />
        </Route>


        <Route path="/booked/:event_id">
          <Booked />
        </Route>
      </Switch> */}
    </div>
  );
}

export default App;
