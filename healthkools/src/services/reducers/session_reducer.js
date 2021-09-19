import * as storage from "../storage";
import { LOGIN, LOGOUT_SUCCESS } from "../actions";

import { set, get } from "../storage";
const initialState = {
  user: storage.get("session_user"),
  authenticated: false
};
let user;

if (initialState.user) {
  initialState.authenticated = true;
}

const session_reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      if (!action.error) {
        user = {
          token: action.payload.access_token,
          firstName: action.payload.user.first_name? action.payload.user.first_name: action.payload.user.f_name,
          lastName: action.payload.user.last_name? action.payload.user.last_name: action.payload.user.l_name,
          image: (action.payload.user.image && action.payload.user.image.url) || action.payload.user.image_url,
          account_type: action.payload.user.account_type,
          profile: {
            firstName: action.payload.user.first_name ? action.payload.user.first_name : action.payload.user.f_name,
            lastName: action.payload.user.last_name ? action.payload.user.last_name : action.payload.user.l_name,
            username: action.payload.user.username,
            birthday: action.payload.user.birthday,
            gender: action.payload.user.gender,
            address: action.payload.user.address,
            email: action.payload.user.email,
            image: action.payload.user.image && action.payload.user.image.url,
            phone_number: action.payload.user.phone_number,
            password_is_forgotten: action.payload.user.password_is_forgotten,
          },
        };
        storage.set("session_user", user);
        return { user, authenticated: true };
      }
      return { user, authenticated: false };
    case LOGOUT_SUCCESS:
      storage.remove("session_user");
      return { authenticated: false, user: null };
    default:
      return state;
  }
};

export default session_reducer;
