import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

// App Reducers
import projectReducer from './reducers/projects';

// Combine Reducers
var reducers = combineReducers({
    projectReducer: projectReducer
    // more if you want...
});

// Create Store
var store = createStore(
    reducers,
    applyMiddleware(thunk)
);

export default store;