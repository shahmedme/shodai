import { Skeleton } from "antd";
import React from "react";
import { useSelector } from "react-redux";

export default function Profile() {
	const user = useSelector((state) => state.auth.user);

	return (
		<div className="p-5">
			<div className="rounded flex bg-gray-200 overflow-hidden cover">
				{user ? (
					<>
						<div className="w-3/5 p-3 lg:p-5">
							<h2 className="text-xl font-bold m-0">
								{user.firstName + " " + user.lastName}
							</h2>
							<p>@{user.username}</p>
						</div>
						<div className="w-2/5 h-46 md:h-32 lg:h-48 p-3 lg:p-5 rounded overflow-hidden">
							<img
								src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
								alt="dp"
								className="dp"
							/>
						</div>
					</>
				) : null}
			</div>
			<div className="grid md:grid-cols-2 gap-2 md:gap-4 mt-5">
				<div className="w-full shadow p-3 lg:p-5">
					<h2>Billing Address:</h2>
					<div>Kalabagan 1st Lane, Dhaka</div>
					<div>01709776055</div>
				</div>
				<div className="w-full shadow p-3 lg:p-5">
					<h2>Shipping Address:</h2>
					<div>Kalabagan 1st Lane, Dhaka</div>
					<div>01709776055</div>
				</div>
			</div>
			<style jsx>{`
				.dp {
					width: 100%;
					height: 100%;
					object-fit: cover;
				}
			`}</style>
		</div>
	);
}
