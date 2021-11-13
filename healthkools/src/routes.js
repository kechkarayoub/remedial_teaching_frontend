import React from "react";
import { Route, withRouter } from "react-router-dom";
import {  get } from "./services/storage";


const AppHomeRoute = ({
  Component,
  history,
  ...rest
}) => {
  var user = get("user");
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
