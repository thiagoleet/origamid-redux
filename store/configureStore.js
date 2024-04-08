const { createStore, combineReducers, compose, applyMiddleware } = Redux;
import thunk from "./middleware/thunk.js";
import localStorageMiddleware from "./middleware/localStorage.js";
import token from "./reducers/token.js";
import user from "./reducers/user.js";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
  applyMiddleware(thunk, localStorageMiddleware)
);

const reducer = combineReducers({ token, user });

const store = createStore(reducer, enhancer);

export default store;
