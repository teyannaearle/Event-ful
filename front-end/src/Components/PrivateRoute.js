import React, { useContext, useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../Providers/UserProvider";

const PrivateRoute = ({
  component: RouteComponent,
  deleteEvent,
  events,
  user_id,
  setUpdateEvent,
  formattedName,
  lat,
  lng,
  formatter,
  location,
  ...rest
}) => {
  const currentUser = useContext(UserContext);
  const [loaded, setLoaded] = useState(false);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoaded(true);
  //   }, 1000);
  //   return () => {
  //     // cleanup
  //   };
  // }, []);

  return (
    <Route
      {...rest}
      render={(props) => {
        !!currentUser ? (
          <RouteComponent
            {...props}
            deleteEvent={deleteEvent}
            events={events}
            setUpdateEvent={setUpdateEvent}
            user_id={user_id}
            formattedName={formattedName}
            lat={lat}
            lng={lng}
            formatter={formatter}
            location={location}
          />
        ) : (
          <Redirect to={"/signin"} />
        );
      }}
    />
  );
};

export default PrivateRoute;
