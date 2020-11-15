import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute({
  component: Component,
  authorized,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authorized === true ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
}
