import React from "react";
import { Route, withRouter, Redirect } from "react-router-dom";
import { clear, set, get, remove } from "./services/storage";

import { useHistory } from "react-router-dom";

const AppHomeRoute = ({
  Component,
  history,
  ...rest
}) => {
  var user = get("session_user");
  return (
    <>
      <Route
        {...rest}
        render={props => (
          <Component {...props} />
        )}
      />
    </>
  );
};

export default {
  AppHomeRoute: withRouter(AppHomeRoute)
};
