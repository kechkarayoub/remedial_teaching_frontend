import moment from "moment";
import { format_as_date } from "utils/datetime_format";

describe('Format_as_date function', () => {
    test('Test format_as_date', () => {
        expect(format_as_date(moment())).toBe(moment().format("DD/MM/YYYY"));
    });
});