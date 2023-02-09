import loginReducer from 'app_store/reducers/loginReducer';

// import {configureStore} from '@reduxjs/toolkit';

// const store = configureStore({
//   reducer: {
//       login: loginReducer,
//   },
// })
// // const store = createStore(reducers, {}, applyMiddleware(promiseMiddleware));
// export default store;
import { createStore } from "redux";
import rootReducer from "app_store/reducers";

const store = createStore(rootReducer);

export default store;