import LoadingAssets from "components/LoadingAssets";
import React from "react";
import { Route, withRouter } from "react-router-dom";
import {  get } from "services/storage";


const AppHomeRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => (
        <React.Suspense fallback={<LoadingAssets />}>
          <Component {...props} />
        </React.Suspense>
      )}
    />
  );
};

export default {
  AppHomeRoute: withRouter(AppHomeRoute)
};
