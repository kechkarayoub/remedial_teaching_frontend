export const GLOBAL = "GLOBAL";
export const LOGIN = "LOGIN";


export const global_action = (payload) => {
    return {
        type: GLOBAL,
        payload: payload,
    };
};
export const login_action = (payload) => {
    return {
        type: LOGIN,
        payload: payload
    };
};