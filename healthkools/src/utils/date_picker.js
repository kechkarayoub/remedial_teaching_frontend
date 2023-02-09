import { registerLocale, setDefaultLocale } from  "react-datepicker";
import ar from "date-fns/locale/ar-MA";
import en from "date-fns/locale/en-US";
import fr from "date-fns/locale/fr";
import { get } from "services/storage";

export const setInitLocale = current_language => {
    current_language = current_language || get("current_language");
    if(current_language === "ar"){
        registerLocale('ar', ar);
    }
    else if(current_language === "en"){
        registerLocale('en', en);
    }
    else{
        registerLocale('fr', fr);
    }
}

export const changeLocale = current_language => {
    current_language = current_language || get("current_language");
    if(current_language === "ar"){
        setDefaultLocale('ar', ar);
    }
    else if(current_language === "en"){
        setDefaultLocale('en', en);
    }
    else{
        setDefaultLocale('fr', fr);
    }
}