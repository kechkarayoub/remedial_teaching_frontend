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


export const login = data => {
  return instance
    .post("/api/login_with_token/", data)
    .then(response => {
      
      var lev = get("level_groups");
      var current_language = get("current_language");
      clear();
      set("level_groups", lev);
      set("current_language", current_language);
      return response.data;
    })
    .catch(err => {
      if (err.response) {
        throw new Error(mapAuthError(err.response.data));
      }
      throw err;
    });
};
