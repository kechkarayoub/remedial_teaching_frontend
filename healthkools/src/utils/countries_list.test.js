import {countries, get_contries_select_options} from "./countries_list";
describe('Get_contries_select_options function', () => {
    test('Test get_contries_select_options', () => {
        var contries_select_options = get_contries_select_options();
        expect(contries_select_options.length).toBe(countries.length);
        var contries_select_options = get_contries_select_options("fr");
        expect(contries_select_options[0].value).toBe("AF");
        var contries_select_options = get_contries_select_options("fr");
        expect(contries_select_options[countries.length - 1].value).toBe("IM");
        var contries_select_options = get_contries_select_options("ar");
        expect(contries_select_options[0].value).toBe("IM");
        expect(contries_select_options[0].label).toBe("آيل أوف مان");
        var contries_select_options = get_contries_select_options("ar");
        expect(contries_select_options[countries.length - 1].value).toBe("HK");
    });
});