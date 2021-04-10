import {combineReducers} from "redux";
import {snapReducer} from "./snap.reducer";
import userReducer from "./user.reducer";

const rootReducer = combineReducers({
    user: userReducer,
    // snap: snapReducer
})

export default rootReducer
