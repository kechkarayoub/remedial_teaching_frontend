import rootReducer from "app_store/reducers";
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: rootReducer,
    // Optionally, you can provide more configuration options here
});

export default store;