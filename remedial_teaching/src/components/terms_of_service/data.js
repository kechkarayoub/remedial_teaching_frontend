import {get} from "services/storage";

const code_mode = process.env.REACT_APP_CODE_MODE;

export const get_data = () => {
    return {
        cndp_declaration_number: "",
        company_address: "",
        company_capital: "",
        company_legal_status: "",
        company_name: "",
        responsable_address: "",
        responsable_full_name: "",
        site_name: get("general_information") && get("general_information").site_name ? get("general_information").site_name : "Remedial teaching",
        site_url: code_mode === "prod" ? "" : code_mode === "preprod" ? "" : code_mode === "server_dev" ? "" : "http://localhost:3000",
    };
}
