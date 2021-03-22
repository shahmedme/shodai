import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./App";
import store from "./state/store";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import "./index.css";
import "antd/dist/antd.css";

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
