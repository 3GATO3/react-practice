// src/store/store.ts
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk'; // If you plan to use async actions, install and import redux-thunk

// Import your reducers
import rootReducer from '../reducers'; // Adjust the path based on your project structure

// Combine reducers if you have multiple reducers
const combinedReducers = combineReducers({
  // Add your reducers here
  // e.g., user: userReducer,
});

// Apply middleware (e.g., redux-thunk for async actions)
const middleware = applyMiddleware(thunk);

// Create the Redux store
const store = createStore(combinedReducers, middleware);

export default store;
