import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./App";
import store from "./state/store";
import "./index.css";
import Home from "./pages/Home";
import Cart from "./pages/Cart";

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<Router>
				<App>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/cart" component={Cart} />
					</Switch>
				</App>
			</Router>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);
