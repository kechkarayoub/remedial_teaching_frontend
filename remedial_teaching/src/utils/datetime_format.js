import moment from "moment";

export const format_as_date = date => {
    return moment(date).format("DD/MM/YYYY");
}
