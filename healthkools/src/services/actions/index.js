export const LOGIN = "LOGIN";


export const LOGIN_ACTION = () => {
    return {
        type: LOGIN,
        payload: {
            user: {username: 'test'}
        }
    };
  };