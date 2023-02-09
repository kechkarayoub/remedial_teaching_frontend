import {GLOBAL} from "store/actions"
const initialState = {};
  
const rootReducer = (state, action) => {
    state = state || initialState;
    if(action.type === GLOBAL){
        return Object.assign({}, state, action.payload);
    }
    return state;
};

export default rootReducer;