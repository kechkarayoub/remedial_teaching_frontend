import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {set_vh_vw_properties} from './utils';
import {I18nextProvider} from 'react-i18next';
import i18next from 'i18next';
import translations_fr from "./translations/fr/translations.json";
import translations_ar from "./translations/ar/translations.json";
import translations_en from "./translations/en/translations.json";
import { get } from "./services/storage";

set_vh_vw_properties();
// window.addEventListener("orientationchange", function() {
//   setTimeout(() => {
//     set_vh_vw_properties();
//   }, 500);
// });

// document.addEventListener("fullscreenchange", function() {
//   setTimeout(() => {
//     set_vh_vw_properties();
//   }, 500);
// });
i18next.init({
  interpolation: { escapeValue: false },  // React already does escaping
  lng: get("current_language") || "ar",   // language to use
  resources: {
      en: {
          translations: translations_en 
      },
      fr: {
          translations: translations_fr
      },
      ar: {
          translations: translations_ar
      },
  },
});
// activate .env file
require('dotenv').config();

ReactDOM.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
        <App/>
    </I18nextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
