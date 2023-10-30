import { get } from "services/storage";
import { get_data } from "components/terms_of_service/data";

const code_mode = process.env.REACT_APP_CODE_MODE;

describe('Get_data function', () => {
    test('Test get_data', () => {
        var data = get_data();
        expect(data.company_address).toBe("");
        expect(data.company_capital).toBe("");
        expect(data.company_legal_status).toBe("");
        expect(data.company_name).toBe("");
        expect(data.responsable_address).toBe("");
        expect(data.responsable_full_name).toBe("");
        expect(data.site_name).toBe(get("general_information") && get("general_information").site_name ? get("general_information").site_name : "HealthKools");
        expect(data.site_url).toBe(code_mode === "prod" ? "" : code_mode === "preprod" ? "" : code_mode === "server_dev" ? "" : "http://localhost:3000");
    });
});
