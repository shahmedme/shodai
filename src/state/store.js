import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import cart from "./cart";
import misc from "./misc";
import auth from "./auth";

const rootReducer = combineReducers({ cart, misc, auth });

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
);

export default store;
