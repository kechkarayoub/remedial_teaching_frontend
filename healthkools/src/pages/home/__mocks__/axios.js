'use strict';
import {general_information_response, feeds_items_data} from "../index.test";
import {geo_info_data} from "../components/SignInUpModal.test";
module.exports = {
  create: (url) => {
    return {
      get: (url) => {
        if(url.indexOf("general_information_api") !== -1){
          return Promise.resolve({data: {general_information: general_information_response}}).then(res => {
            return res;
          });
        }
        else if(url.indexOf("feeds_languages_api") !== -1){
          return Promise.resolve({
            data: {
              feeds_languages: {en: feeds_items_data.items}
            }
          }).then(res => {
            return res;
          });
        }
      }
    }
  },
  get: (url) => {
    if(url.indexOf("https://api.rss2json.com/v1/api.json") !== -1){
      return Promise.resolve({data: feeds_items_data});
    }
    else if(url.indexOf("https://geolocation-db.com/json/") !== -1){
      return Promise.resolve({data: geo_info_data});
    }
  },
};