import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./App";
import store from "./state/store";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import Category from "./pages/Category";
import SearchResult from "./pages/SearchResult";
import Logout from "./components/Logout";
import "./index.css";
import "antd/dist/antd.css";
import Profile from "./pages/Profile";

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<Router>
				<App>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/cart" component={Cart} />
						<Route exact path="/product/:slug" component={ProductDetail} />
						<Route exact path="/category/:categorySlug" component={Category} />
						<Route exact path="/search" component={SearchResult} />
						<Route exact path="/profile" component={Profile} />
						<Route exact path="/logout" component={Logout} />
					</Switch>
				</App>
			</Router>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);
