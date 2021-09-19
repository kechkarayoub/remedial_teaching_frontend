import { createAction } from "redux-actions";
import { login } from "./api";
import { get, remove } from "./storage";

export const LOGIN = "session/LOGIN";
export const LOGOUT_SUCCESS = "session/LOGOUT";
export const loginAction = createAction(LOGIN, async obj => {
  return await login(obj);
});

