import axios from "axios";
import { useState, useEffect } from "react";
import api from "./util/apiCalls";
import Booked from "./Pages/Booked.js";
import Dashboard from "./Pages/Dashboard.js";
import Event from "./Pages/Event.js";
import Favorites from "./Pages/Favorites.js";
import Landing from "./Pages/Landing.js";
import SignUp from "./Pages/SignUp.js";
import VendorIndex from "./Pages/VendorIndex.js";
import VendorShow from "./Pages/VendorShow.js";
import { Route, Switch } from "react-router-dom";

function App() {

  return (
    <div>
      <Switch>
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
      </Switch>
    </div>
  );
}

export default App;
