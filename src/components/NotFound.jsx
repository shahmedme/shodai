import React from "react";
import { Link } from "react-router-dom";

export default function NotFound({ msg }) {
	return (
		<div className="flex justify-center items-center h-96">
			<div className="text-center">
				<h1 className="text-2xl">{msg}</h1>
				<Link
					to="/"
					className="px-3 py-2 mt-3 bg-yellow-200 rounded font-semibold inline-flex items-center"
				>
					<span className="material-icons">arrow_back</span>
					<span className="ml-1">Go to Home Page</span>
				</Link>
			</div>
		</div>
	);
}
