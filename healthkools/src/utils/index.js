export const COLORS = ["#f36422", "#ffee02", "#f070a9", "#00adef", "#7cc142", "#d02b49"];

export const set_vh_vw_properties = () => {
    let vh = window.innerHeight * 0.01,
        vw = window.innerWidth * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    document.documentElement.style.setProperty('--vw', `${vw}px`);
}


export const shuffle = (array_, create_new_array) => {
    var array = create_new_array ? array_.concat([]) : array_;
    array.sort(() => Math.random() - 0.5);
    return array;
}

export const get_random_color = () => {
    return COLORS[Math.floor(Math.random() * COLORS.length)];
}