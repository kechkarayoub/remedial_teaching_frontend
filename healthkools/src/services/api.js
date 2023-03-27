import axios from "axios";
import Compressor from 'compressorjs';
import { set, get, clear } from "services/storage";


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

var check_if_email_or_username_exists_api_sent = false;
export const check_if_email_or_username_exists_api_get = (data) => {
  if(!check_if_email_or_username_exists_api_sent){
    check_if_email_or_username_exists_api_sent = true;
    return instance.get('/user/check_if_email_or_username_exists',
      {params: data},
    )
    .then(res => {
      check_if_email_or_username_exists_api_sent = false;
      return res.data;
    })
    .catch(err => {
      check_if_email_or_username_exists_api_sent = false;
      console.log(err);
    });
  }
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

var check_if_files_storage_api_sent = false;
export const files_storage_api_post = (data, do_not_compress_image) => {
  if(!check_if_files_storage_api_sent){
    let images_files = {};  // Dict that will contains images to compress
    let nbr_files = 0;  // Number of files to compress
    // If file with key 'file_' + nbr_files exists and it's type is image, we will add it to images_files dict and we increment nbr_files
    while(data.get("file_" + (nbr_files + 1))){
      if(data.get("file_" + (nbr_files + 1)).type.indexOf('image/') >= 0){
        images_files["file_" + (nbr_files + 1)] = data.get("file_" + (nbr_files + 1));
      }
      nbr_files++;
    }
    check_if_files_storage_api_sent = true;
    let images_files_keys = Object.keys(images_files);
    // Check if do_not_compress_image flag is false and there ixists images to compress
    if(!do_not_compress_image && images_files_keys.length > 0){
      let nbr_compressed_files = 0;
      return new Promise((resolve, reject) => {
        for(let i=0; i < images_files_keys.length; i++){
          let image_key = images_files_keys[i];
          let file = images_files[image_key];
          new Compressor(file, {
            quality: 0.6,
            maxWidth: 1024,
            maxHeight: 1024,
            // The compression process is asynchronous,
            // which means you have to access the `result` in the `success` hook function.
            success(result) {
              // The third parameter is required for server
              data.set(image_key, result, result.name);
              nbr_compressed_files++;
              if(nbr_compressed_files == images_files_keys.length){
                // if all files are compressed we send the compressed image file to server with XMLHttpRequest.
                return instance.post('/utils/files_storage_api', data, {
                  headers: {
                    "Content-Type": 'multipart/form-data' 
                  },
                }).then(res => {
                  check_if_files_storage_api_sent = false;
                  resolve(res.data);
                })
                .catch(err => {
                  check_if_files_storage_api_sent = false;
                  console.log(err);
                  reject(err);
                });
              }
            },
            error(err) {
              reject(err);
            },
          });
        };
      });
    }
    else{
      return instance.post('/utils/files_storage_api', data,
      ).then(res => {
        check_if_files_storage_api_sent = false;
        return res.data;
      })
      .catch(err => {
        check_if_files_storage_api_sent = false;
        console.log(err);
      });
    }
  }
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

export const register = data => {
  return instance
    .post("/user/register/", data)
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

export const resend_activation_email = data => {
  return instance
    .post("/user/resend_activation_email/", data)
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};
