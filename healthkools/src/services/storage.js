import store from 'store';

export const set = (key, value) => {
  store.set(key, value)
}

export const get = (key) => {
  return store.get(key)
}

export const remove = (key) => {
  store.remove(key)
}

export const clear = () => {
  store.clearAll()
}

export const logout = () => {
  // var lev = get("level_groups");
  // var current_language = get("current_language");
  // clear();
  // set("level_groups", lev);
  // set("current_language", current_language);
  window.location = "/home";
}
