import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

// App Reducers
import projectReducer from './reducers/projects';
import authReducer from './reducers/auth';

// Combine Reducers
let reducers = combineReducers({
    projectReducer: projectReducer,
    authReducer: authReducer
});

// Create Store
let store = createStore(
    reducers,
    applyMiddleware(thunk)
);

export default store;