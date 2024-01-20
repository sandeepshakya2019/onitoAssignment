import { combineReducers, createStore } from "redux";
// import { thunk } from "redux-thunk";
import { fromDetailsReduer } from "../Redux-reducers/stateReducer";

const rootReducer = combineReducers({
  formDetails: fromDetailsReduer,
});

const store = createStore(rootReducer);
export default store;
