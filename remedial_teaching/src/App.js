import ErrorComponent from 'components/ErrorComponent';
import Home from "pages/home";
import LoadingAssets from 'components/LoadingAssets';
import React, { Component, Suspense } from "react";
import RouteSystem from "routes";
import store from "app_store";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { messaging } from "init_fcm";
import { Provider } from "react-redux";
import { set } from "services/storage";
import { withTranslation, Trans } from "react-i18next";

import 'App.css';
import 'assets/sass/global.scss';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import "react-datepicker/dist/react-datepicker.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class App extends Component {

  constructor(props){
    super(props);
  }
  
  registerPushListener = () => {
    if(messaging){
      messaging.onMessage(function(payload) {
        console.log("Message received. ", payload);
        // alert(payload.notification.body)
      });
    }
  }

  async componentDidMount(){
    if(messaging){
      messaging
          .requestPermission()
          .then(async function() {
            const token = await messaging.getToken();
            set('device_token', token);
            // get_instanceID_info(token).then(res => {
            //   set('topics', res.rel.topics);
            // }).catch(err => {
            //   set('topics', []);
            // })

          })
          .catch(function(err) {
            console.log("Unable to get permission to notify.", err);
          });
      this.registerPushListener();
    }


  }
  render(){
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Suspense fallback={<LoadingAssets/>}>
            <Switch>
              <Route
                exact
                path="/ErrorPage"
                render={props => <ErrorComponent {...props} />}
              />

              <RouteSystem.AppHomeRoute path='*' exact component={Home} />

            </Switch>
          </Suspense>
        </BrowserRouter>
      </Provider>
    );
  }

}

export default withTranslation("translations")(App);
