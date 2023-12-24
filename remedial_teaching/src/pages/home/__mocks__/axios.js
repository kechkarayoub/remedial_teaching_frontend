'use strict';
import { general_information_response } from "pages/home/index.test";
import { geo_info_data } from "pages/home/components/SignInUpModal.test";
module.exports = {
  create: (url) => {
    return {
      get: (url, data) => {
        if(url.indexOf("general_information_api") !== -1){
          return Promise.resolve({data: {general_information: general_information_response}}).then(res => {
            return res;
          });
        }
        else if(url.indexOf("/user/check_if_email_or_username_exists") !== -1){
          return Promise.resolve({
            data: {
              user_exists: data.email_or_username == "exists",
              message: "message",
            }
          }).then(res => {
            return res;
          });
        }
      },
      post: (url, data) => {
        if(url.indexOf("/user/resend_activation_email/") !== -1){
          var res = {};
          if(data.username === "resent_success"){
            res = {
              success: true, 
              message: "A new activation email is sent to the address test@example.com.",
            };
          }
          else if(data.username === "resent_failed"){
            res = {
              success: false, 
              message1: "Your email address is already validated!",
              message2: "You can now log in with your username/email and password.",
            };
          }
          else if(data.username === "no_username"){
            res = {
              success: false, 
              message: "We couldn't find an account with that username: no_username!",
            };
          }
          return Promise.resolve({data: res}).then(res => {
            return res;
          });
        }
        else if(url.indexOf("/utils/files_storage_api") !== -1){
          var res = {};
          if(data.get("file_1")){
            res = {
              success: true, 
              files: [
                {
                  content_type: "image/jpeg",
                  name: "file_name",
                  url: "file_url",
                },
              ],
              raise_error: data.get("raise_error"),
            };
            if(data.get("raise_error")){
              res = {};
            }
          }
          return Promise.resolve({data: res}).then(res => {
            return res;
          }).catch(err => {
            return err;
          });
        }
      }
    }
  },
  get: (url) => {
    if(url.indexOf("https://geolocation-db.com/json/") !== -1){
      return Promise.resolve({data: geo_info_data});
    }
  },
};