import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

// App Reducers
import projectReducer from "./reducers/projects";
import authReducer from "./reducers/auth";
import modalsReducer from "./reducers/modals";

// Combine Reducers
let reducers = combineReducers({
  projectReducer: projectReducer,
  authReducer: authReducer,
  modalsReducer: modalsReducer,
});

// Create Store
let store = createStore(reducers, applyMiddleware(thunk));

export default store;
