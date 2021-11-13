import * as storage from "../storage";
import {LOGIN} from "../actions"
import {createSlice} from "@reduxjs/toolkit";

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
