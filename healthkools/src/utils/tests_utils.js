export const remove_html_tags_from_string = string => {
    var div = document.createElement("p");
    div.innerHTML = string;
    return div.textContent;
}
export const split_html_string = html_string => {
    html_string = html_string.split("<b>").join("*_*_");
    html_string = html_string.split("</b>").join("*_*_");
    html_string = html_string.split("<br/>").join("*_*_");
    return html_string.split('*_*_');
}