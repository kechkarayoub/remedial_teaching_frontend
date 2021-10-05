import axios from "axios";
import { set, get, clear } from "./storage";

// import {get_instanceID_info} from './cms/api'

const instance = axios.create({ baseURL: process.env.REACT_APP_URL_WS });

const mapAuthError = message => {
  if (message.error === "not_activated") {
    return `Ton compte n'a pas encore été activé - Le message d'activation a été envoyé à l'adresse ${message.parent_email}`;
  } else if (message.error === "no_subscription") {
    return "Votre abonnement a expiré";
  } else if (message.error === "not_email_active") {
    return [
      `Ton compte n'a pas encore été activé - Le message d'activation a été envoyé à l'adresse ${message.email}`,
      "mail_not_yet_verified"
    ];
  } else if (message.error === "not_phone_active") {
    return [
      `Ton compte n'a pas encore été activé - Le code d'activation a été envoyé au numéro ${message.phone}`,
      "phone_not_yet_verified"
    ];
  } else {
    return "Username or Password incorrect";
  }
  //return "Erreur d'authentification";
};


export const feeds_api_get = (api_key, url) => {
  return axios.get('https://api.rss2json.com/v1/api.json?api_key='+api_key+'&rss_url=' + url)
  .then(res => {
    return res.data;
  })
  .catch(err => {
    console.log(err);
  });
};


export const get_geo_info = (api_key) => {
  return axios.get('https://geolocation-db.com/json/'+api_key)
  .then(res => {
    return res.data;
  })
  .catch(err => {
    console.log(err);
  });
};

var general_information_api_sent = false;
export const general_information_api_get = () => {
  if(!general_information_api_sent){
    general_information_api_sent = true;
    return instance.get('/general_information_api')
    .then(res => {
      general_information_api_sent = false;
      set("general_information", res.data.general_information || {});
      var event = document.createEvent('Event');
      event.initEvent('general_information_stored', true, true);
      window.dispatchEvent(event);
    })
    .catch(err => {
      general_information_api_sent = false;
      console.log(err);
    });
  }
};

var feeds_languages_api_sent = false;
export const feeds_languages_api_get = () => {
  if(!feeds_languages_api_sent){
    feeds_languages_api_sent = true;
    return instance.get('/feeds_languages_api')
    .then(res => {
      feeds_languages_api_sent = false;
      return res.data;
    })
    .catch(err => {
      feeds_languages_api_sent = false;
      console.log(err);
    });
  }
};


export const login = data => {
  return instance
    .post("/api/login_with_token/", data)
    .then(response => {
      
      var current_language = get("current_language");
      clear();
      set("current_language", current_language);
      return response.data;
    })
    .catch(err => {
      if (err.response) {
        throw new Error(mapAuthError(err.response.data));
      }
      console.log(err);
    });
};
