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
import NotFound404 from "./pages/404";
import Orders from "./pages/Orders";
import Settings from "./pages/Settings";
import Administration from "./pages/Administration";
import PrivateRoute from "./components/PrivateRoute";

const allRoles = ["user", "admin", "superadmin"];
const userRoles = ["user"];
const adminRoles = ["admin", "superadmin"];

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<App>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/cart" component={Cart} />
					<Route exact path="/product/:slug" component={ProductDetail} />
					<Route exact path="/category/:categorySlug" component={Category} />
					<Route exact path="/search" component={SearchResult} />
					<PrivateRoute
						exact
						path="/orders"
						permit={userRoles}
						component={Orders}
					/>
					<PrivateRoute
						exact
						path="/profile"
						permit={userRoles}
						component={Profile}
					/>
					<PrivateRoute
						exact
						path="/settings"
						permit={userRoles}
						component={Settings}
					/>
					<Route exact path="/logout" component={Logout} />
					<PrivateRoute
						path="/admin"
						permit={adminRoles}
						component={Administration}
					/>
					<Route path="*" component={NotFound404} />
				</Switch>
			</App>
		</Router>
	</Provider>,
	document.getElementById("root")
);
