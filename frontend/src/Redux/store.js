import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import { authReducer } from './AuthReducer/reducer'
import { postReducer } from "./PostReducer/reducer";

let rootreducer=combineReducers({
    authReducer,
    postReducer
})

export const store=legacy_createStore(rootreducer,applyMiddleware(thunk))