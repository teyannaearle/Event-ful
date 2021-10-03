import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../Providers/UserProvider";

export default function PrivateRoute({ component: RouteComponent, ...rest }) {
  const { currentUser } = useContext(UserContext);
//   console.log(JSON.stringify(currentUser))
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        !!currentUser ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={"/signin"} />
        )
      }
    />
  );
}
