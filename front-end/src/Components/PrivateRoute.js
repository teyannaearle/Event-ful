import React, { useContext, useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../Providers/UserProvider";
import Loading from "./Loading";

const PrivateRoute = ({
  component: Component,
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
  return (
    <Route
      {...rest}
      render={(props) =>
        !!currentUser ? (
          <Component
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
          <Redirect to="/signin" />
        )
      }
    />
  );
};

export default PrivateRoute;
