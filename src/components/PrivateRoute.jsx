import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
import { message } from "antd";
import { ENABLE_LOGIN_MODE } from "../state/misc";

export default function PrivateRoute({
	component: Component,
	permit,
	...rest
}) {
	const user = useSelector((state) => state.auth.user);
	const dispatch = useDispatch();

	return (
		<Route
			{...rest}
			render={(props) => {
				if (user === null) {
					return <div />;
				} else if (user?.username && permit.includes(user.role)) {
					return <Component {...props} />;
				} else if (user?.username && !permit.includes(user.role)) {
					message.error("You've not sufficient permissions");
				} else {
					dispatch({ type: ENABLE_LOGIN_MODE });
					message.info("You need to login first");
				}
				return <Redirect to="/" />;
			}}
		/>
	);
}
