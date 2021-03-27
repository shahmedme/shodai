import React, { useEffect } from "react";
import Storage from "../utils/storage";

export default function Logout() {
	useEffect(() => {
		Storage.remove("token");
		Storage.remove("cart");
		window.location.href = "/";
	}, []);

	return <div></div>;
}
