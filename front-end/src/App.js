import Booked from "./Pages/Booked.js";
import Dashboard from "./Pages/Dashboard.js";
import Event from "./Pages/EventPage";
import Favorites from "./Pages/Favorites.js";
import Landing from "./Pages/Landing.js";
import SignUp from "./Pages/SignUp.js";
import VendorIndex from "./Pages/VendorIndex.js";
import VendorShow from "./Pages/VendorShow.js";
// import { Route, Switch } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import useGeoLocation from "./hooks/useGeoLocation";
import ScrollToTop from "./Components/ScrollToTop.js";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./App.css";

import { AuthProvider } from "./Components/Auth";
import PrivateRoute from "./Components/PrivateRoute";

import axios from "axios";
import { useState, useEffect, useContext } from "react";
import api from "./util/apiCalls";
import Login from "./Components/Login";

import NewEventForm from "./Pages/NewEventForm.js";


function App() {
  const location = useGeoLocation();

  return (
    <div className="site">
      <ScrollToTop />

      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <Landing />
            </Route>

            <Route path="/signup">
              <SignUp />
            </Route>

            {/* <PrivateRoute exact path="/" component={Landing} /> */}
            <PrivateRoute path="/dashboard/:user_id" component={Dashboard}/>
            {/* <Route path="/dashboard/:user_id">
              <Dashboard />
            </Route> */}

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
              <VendorIndex location={location} />
            </Route>

            <Route path="/booked/:user_id/:event_id">
              <Booked />
            </Route>
          </Switch>
        </Router>
      </AuthProvider>

    </div>
  );
}

export default App;
