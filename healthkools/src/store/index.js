import loginReducer from 'store/reducers/loginReducer';

// import {configureStore} from '@reduxjs/toolkit';

// const store = configureStore({
//   reducer: {
//       login: loginReducer,
//   },
// })
// // const store = createStore(reducers, {}, applyMiddleware(promiseMiddleware));
// export default store;
import { createStore } from "redux";
import rootReducer from "store/reducers";

const store = createStore(rootReducer);

export default store;