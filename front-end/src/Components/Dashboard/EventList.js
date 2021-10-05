import React, { useContext } from "react";
import Event from "./Event";
import { Link } from "react-router-dom";
import { UserContext } from "../../Providers/UserProvider";

function EventList({ events, deleteEvent }) {
  const loggedInUser = useContext(UserContext);
  const user_id = loggedInUser ? loggedInUser.user_id : null;
  const location = useLocation();
  console.log(`event list user_id is ${user_id}`);

  useEffect(() => {
    if (user_id) {
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
    }
  }, [user_id, location.pathname]);

  return (
    <>
      <ul className="dash-events">
        <span className="dash-event new-sq">
          <Link to={`/dashboard/new_event`} className="new-event">
            <p id="new">Create a new event and start planning! </p>
            <p className="plus-sign"> &#x002B;</p>
          </Link>
        </span>
        {events
          ? events.map((event) => {
              return (
                <li key={event.event_id} className="dash-event">
                  <Event
                    event={event}
                    deleteEvent={deleteEvent}
                  />
                </li>
              );
            })
          : null}
      </ul>
    </>
  );
}

export default EventList;
