import { getDefaultLocale } from  "react-datepicker";
import {changeLocale} from "./date_picker";
describe('ChangeLocale function', () => {
    test('Test changeLocale', () => {
        changeLocale("ar");
        expect(getDefaultLocale()).toBe("ar");
        changeLocale("en");
        expect(getDefaultLocale()).toBe("en");
        changeLocale("fr");
        expect(getDefaultLocale()).toBe("fr");
        changeLocale("es");
        expect(getDefaultLocale()).toBe("fr");
    });
});