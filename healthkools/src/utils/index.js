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