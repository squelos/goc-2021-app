import {applyMiddleware, createStore} from "@reduxjs/toolkit";
import rootReducer from "./reducer/root.reducer";
import thunk from "redux-thunk";

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store
