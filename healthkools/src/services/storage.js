import store from 'store';

export const set = (key, value) => {
  store.set(key, value);
}

export const get = (key) => {
  var res = store.get(key);
  if(key === "current_language"){
    return res || "fr";
  }
  return res;
}

export const remove = (key) => {
  store.remove(key);
}

export const clear = () => {
  store.clearAll();
}

export const logout = () => {
  // var lev = get("level_groups");
  // var current_language = get("current_language");
  // clear();
  // set("level_groups", lev);
  // set("current_language", current_language);
  window.location = "/home";
}
