import i18next from 'i18next';
import translations_fr from "./translations/fr/translations.json";
import translations_ar from "./translations/ar/translations.json";
import translations_en from "./translations/en/translations.json";
import { get } from "./services/storage";
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
export default i18next;
