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
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>

        <Route path="/signup">
          <SignUp />
        </Route>

        <Route path="/dashboard/new_event/:user_id">
          <NewEventForm />
        </Route>

        <Route path="/dashboard/:user_id">
          <Dashboard />
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

        <Route path="/events/:user_id/edit">
          <EditFormPage user_id={user_id} />
        </Route>

        <Route path="/event/:user_id/:event_id">
          <Event formatter={formatter} />
        </Route>

        <Route path="/vendor/:category/:provider_id">
          <VendorShow user_id={user_id} events={events} />
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
    </div>
  );
}

export default App;
