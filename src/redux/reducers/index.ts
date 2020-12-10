import { stat } from "fs";
import { combineReducers } from "redux";
import { AuthUserInfoReducer } from "./AuthUserInfoReducer";

const rootReducer = combineReducers({ 
    authUserInfo: AuthUserInfoReducer 
});

export default rootReducer;