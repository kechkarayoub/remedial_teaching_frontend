export const GLOBAL = "GLOBAL";
export const LOGIN = "LOGIN";

// Global action
export const global_action = (payload) => {
    return {
        type: GLOBAL,
        payload: payload,
    };
};

// Login action
export const login_action = (payload) => {
    return {
        type: LOGIN,
        payload: payload
    };
};