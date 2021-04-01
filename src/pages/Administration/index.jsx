import React from "react";
import { Route, Switch } from "react-router";
import Dashboard from "./Dashboard";
import Products from "./Products";
import Orders from "./Orders";
import Users from "./Users";

export default function Administration() {
	return (
		<Switch>
			<Route exact path="/admin" component={Dashboard} />
			<Route exact path="/admin/products" component={Products} />
			<Route exact path="/admin/orders" component={Orders} />
			<Route exact path="/admin/users" component={Users} />
		</Switch>
	);
}
