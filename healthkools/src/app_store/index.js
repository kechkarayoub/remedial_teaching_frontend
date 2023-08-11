import loginReducer from 'app_store/reducers/loginReducer';

// import {configureStore} from '@reduxjs/toolkit';

// const store = configureStore({
//   reducer: {
//       login: loginReducer,
//   },
// })
// // const store = createStore(reducers, {}, applyMiddleware(promiseMiddleware));
// export default store;
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from "app_store/reducers";

const store = configureStore({
    reducer: rootReducer,
    // Optionally, you can provide more configuration options here
});
export default store;