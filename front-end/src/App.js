import Booked from "./Pages/Booked.js";
import Dashboard from "./Pages/Dashboard.js";
import Event from "./Pages/EventPage";
import Favorites from "./Pages/Favorites.js";
import Landing from "./Pages/Landing.js";
import SignUp from "./Pages/SignUp.js";
import VendorIndex from "./Pages/VendorIndex.js";
import VendorShow from "./Pages/VendorShow.js";
import ListEdit from "./Pages/ListEdit.js";
import { Route, Switch } from "react-router-dom";
import useGeoLocation from "./hooks/useGeoLocation";
import ScrollToTop from "./Components/ScrollToTop.js";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./App.css";
import axios from "axios";
import NavBar from "./Components/NavBar/NavBar.js";
import NewEventForm from "./Pages/NewEventForm.js";
import { useEffect, useState } from "react";
import { apiURL } from "./util/apiURL";
import EditFormPage from "./Pages/EditFormPage.js";

const API = apiURL();
const user_id = 1;
const name = "jasleen"

function App() {
  const location = useGeoLocation();
  const [events, setEvents] = useState([]);
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    axios
      .get(`${API}/events/${user_id}`)
      .then(
        (res) => {
          setEvents(res.data.message);
        },
        (e) => {
          console.error(e);
        }
      )
      .catch((e) => {
        console.error(e);
      });

    return () => {
      setEvents([]);
    };
  }, []);

  useEffect(() => {
    if (location.coordinates) {
      setLat(location.coordinates.latitude);
      setLng(location.coordinates.longitude);
    }
  }, [location]);

  return (
    <div className="site">
      <ScrollToTop />
      <NavBar user_id={user_id} />
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>

        <Route path="/signup">
          <SignUp />
        </Route>

        <Route path="/dashboard/new_event">
          <NewEventForm user_id={user_id} />
        </Route>

        <Route path="/dashboard/:event_id/edit">
          <EditFormPage user_id={user_id} />
        </Route>

        <Route path="/dashboard">
          <Dashboard user_id={user_id} name={name[0].toUpperCase() + name.slice(1)}/>
        </Route>

        <Route path="/task/:category/:event_id/:task_id">
          <ListEdit
            user_id={user_id}
            lat={lat}
            lng={lng}
            formatter={formatter}
            events={events}
          />
        </Route>

        <Route path="/event/:event_id">
          <Event formatter={formatter} user_id={user_id} />
        </Route>

        <Route path="/vendor/:category/:provider_id">
          <VendorShow user_id={user_id} events={events} />
        </Route>

        <Route path="/favorites">
          <Favorites user_id={user_id} />
        </Route>

        <Route path="/vendors/:category">
          <VendorIndex location={location} />
        </Route>

        <Route path="/booked/:event_id">
          <Booked user_id={user_id} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
