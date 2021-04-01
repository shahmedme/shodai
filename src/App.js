import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import AdminLayout from "./components/Layout/AdminLayout";
import UserLayout from "./components/Layout/UserLayout";
import { loadUser } from "./state/auth";

export default function App({ children }) {
	const user = useSelector((state) => state.auth.user);
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		dispatch(loadUser());
	}, []);

	if (user?.role === "superadmin" || user?.role === "admin") {
		history.push("/admin");
	}

	return (
		<>
			{user && (user.role === "superadmin" || user.role === "admin") ? (
				<AdminLayout children={children} />
			) : user !== null ? (
				<UserLayout children={children} />
			) : null}
		</>
	);
}
