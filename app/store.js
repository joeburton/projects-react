import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

// App Reducers
import projectReducer from './reducers/projects';
import authReducer from './reducers/auth';

// Combine Reducers
var reducers = combineReducers({
    projectReducer: projectReducer,
    authReducer: authReducer
});

// Create Store
var store = createStore(
    reducers,
    applyMiddleware(thunk)
);

export default store;