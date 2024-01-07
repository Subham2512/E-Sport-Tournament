import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import loggedUserReducer from "./loggedUserReducer";
import userIdReducer from "./userIdReducer";

const reducers = combineReducers({
  login: loginReducer,
  user: loggedUserReducer,
  userId: userIdReducer,
});

export default reducers;
