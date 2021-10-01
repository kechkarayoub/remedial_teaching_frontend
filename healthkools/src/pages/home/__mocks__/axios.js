'use strict';
import {general_information_response, feeds_items_data} from "../index.test";
module.exports = {
  create: (url) => {
      return {
        get: (url) => {
          if(url.indexOf("general_information") !== -1){
              return Promise.resolve({data: {general_information: general_information_response}}).then(res => {
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
  },
};