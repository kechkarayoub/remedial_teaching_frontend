import * as storage from "services/storage";
import { LOGIN } from "app_store/actions";

var initialState = {
  user: storage.get("user"),
  authenticated: false
};

if (initialState.user) {
  initialState.authenticated = true;
}

export const loginReducer= (state, action) =>  {
  state = state || initialState;
  switch(action.type){
    case LOGIN:
      state.user = action.payload.user;
      return state;
      break;
    default:
      return state;
  }
};

export default loginReducer;
