import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "./Providers/UserProvider";
import { apiURL } from "./util/apiURL";
import Booked from "./Pages/Booked.js";
import Dashboard from "./Pages/Dashboard.js";
import Event from "./Pages/EventPage";
import Favorites from "./Pages/Favorites.js";
import Landing from "./Pages/Landing.js";
import SignUp from "./Pages/SignUp.js";
import SignIn from "./Pages/SignIn.js";
import VendorIndex from "./Pages/VendorIndex.js";
import VendorShow from "./Pages/VendorShow.js";
import EditBooked from "./Pages/EditBooked.js";
import ScrollToTop from "./Components/ScrollToTop.js";
import EditFormPage from "./Pages/EditFormPage.js";
import FourOFour from "./Pages/FourOFour";
import PrivateRoute from "./Components/PrivateRoute";
import Banner from "./Components/Banner";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";


const API = apiURL();

function App() {
  const loggedInUser = useContext(UserContext);
  const [user_id, setUserId] = useState(null);
  const [created, setCreated] = useState(false);
  const [events, setEvents] = useState([]);
  const [updateEvent, setUpdateEvent] = useState(false);
  const [city, setCity] = useState("");
  const [formattedName, setFormattedName] = useState("");
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const accessToken = loggedInUser.currentUser ? loggedInUser.currentUser.accessToken : null

  useEffect(() => {
    try {
      axios
        .get(
          `https://ipinfo.io/json?token=90229ead70bb3e`
        )
        .then((res) => {
          setCity(`${res.data.city}, ${res.data.region}`);
        });
    } catch (e) {
      console.warn(e);
    }
    return () => {
      setCity("");
    }
  }, []);

  useEffect(() => {
    (async () => {
      if (loggedInUser.currentUser) {
        const { email, accessToken }= loggedInUser.currentUser
        let checkUser = await axios.get(`${API}/users/${email}`, {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        });
        if (checkUser.data.success) {
          setUserId(checkUser.data.payload.user_id);
        } 
        if (loggedInUser.currentUser.displayName){
          const username = loggedInUser.currentUser.displayName
              .split(" ")[0][0]
              .toUpperCase() +
            loggedInUser.currentUser.displayName.split(" ")[0].substring(1)
          
            setFormattedName(username);
        } 

      }
    })();
    return () => {
      setUserId(null)
      setFormattedName("")
    };
  }, [loggedInUser]);

  useEffect(() => {
    if (user_id && accessToken) {
      axios
        .get(`${API}/events/${user_id}`, {  headers: {
          Authorization: "Bearer " + accessToken,
        },})
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

        axios
        .get(`${API}/users/id/${user_id}`, {  headers: {
          Authorization: "Bearer " + accessToken,
        },})
        .then(
          (res) => {
            if (formattedName === ""){
              let username = res.data.payload.display_name
              .split(" ")[0][0]
              .toUpperCase() +
              res.data.payload.display_name.split(" ")[0].substring(1)
              setFormattedName(username) 
            }
          },
          (e) => {
            console.error(e);
          }
        )
        .catch((e) => {
          console.error(e);
        });
    }

    return () => {
      setEvents([])
    }
  }, [user_id, updateEvent, created, accessToken, formattedName]);

  const deleteEvent = async (event_id) => {
    try {
      await axios.delete(`${API}/events/${user_id}/${event_id}` ,{  headers: {
          Authorization: "Bearer " + accessToken,
        },}).then((res) => {
        const eventsCopy = [...events];
        const index = eventsCopy.findIndex(
          (event) => event.event_id === event_id
        );
        eventsCopy.splice(index, 1);
        setEvents(eventsCopy);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="site">
      <Router>
        <ScrollToTop />
        <Switch>
          <Route exact path="/">
          <Banner />
            <Landing />
          </Route>

          <Route path="/signup">
          <Banner />
            <SignUp setUserId={setUserId}/>
          </Route>

          <Route path="/signin">
          <Banner />
            <SignIn setUserId={setUserId}/>
          </Route>

          <PrivateRoute
            path="/dashboard/:event_id/edit"
            component={EditFormPage}
            setUpdateEvent={setUpdateEvent}
            user_id={user_id}
          />

          <PrivateRoute
            path={"/dashboard"}
            component={Dashboard}
            deleteEvent={deleteEvent}
            events={events}
            setUpdateEvent={setUpdateEvent}
            user_id={user_id}
            formattedName={formattedName}
            created={created}
            setCreated={setCreated}
          />

          <PrivateRoute
            path="/task/:category/:event_id/:task_id"
            component={EditBooked}
            city={city}
            formatter={formatter}
            user_id={user_id}
          />

          <PrivateRoute
            path="/event/:event_id"
            component={Event}
            formatter={formatter}
            user_id={user_id}
          />

          <PrivateRoute
            path="/vendor/:category/:provider_id"
            component={VendorShow}
            user_id={user_id}
          />

          <PrivateRoute
            path="/favorites"
            component={Favorites}
            loggedInUser={loggedInUser}
            user_id={user_id}
            formattedName={formattedName}
          />

          <PrivateRoute
            path="/vendors/:category"
            component={VendorIndex}
            city={city}
          />

          <PrivateRoute
            path="/booked/:event_id/:event_name"
            component={Booked}
            user_id={user_id}
          />

          <Route path="*">
            <FourOFour />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
