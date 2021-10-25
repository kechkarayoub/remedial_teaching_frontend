import {get} from "../../services/storage";
export const get_data = () => {
    return {
        company_address: "",
        company_capital: "",
        company_legal_status: "",
        company_name: "",
        responsable_address: "",
        responsable_full_name: "",
        site_name: get("general_information") && get("general_information").site_name ? get("general_information").site_name : "HealthKools",
        site_url: "http://localhost:3000",
    };
}