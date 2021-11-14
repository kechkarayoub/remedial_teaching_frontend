import loginReducer from './reducers/loginReducer';

// import {configureStore} from '@reduxjs/toolkit';

// const store = configureStore({
//   reducer: {
//       login: loginReducer,
//   },
// })
// // const store = createStore(reducers, {}, applyMiddleware(promiseMiddleware));
// export default store;
import { createStore } from "redux";
import rootReducer from "./reducers";

const store = createStore(rootReducer);

export default store;