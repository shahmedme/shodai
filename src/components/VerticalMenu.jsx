import React from "react";
import { Link } from "react-router-dom";

const navItems = [
	{ title: "Baby Care", slug: "baby-care", icon: "child_friendly" },
	{ title: "Pet Care", slug: "pet-care", icon: "pets" },
	{ title: "Food", slug: "food", icon: "ramen_dining" },
	{ title: "Home & Cleaning", slug: "home-cleaning", icon: "bed" },
	{ title: "Office Products", slug: "office-products", icon: "apartment" },
	{
		title: "Beauty & Health",
		slug: "beauty-health",
		icon: "health_and_safety",
	},
];

export default function VerticalMenu() {
	return (
		<>
			<div className="px-8 pt-3 vertical-menu">
				<Link to="/" className="logo">
					<img
						src="https://upload.wikimedia.org/wikipedia/en/d/de/Chaldal.com_logo.png"
						alt="logo"
						className="w-3/4"
					/>
				</Link>
				<ul className="navbar mt-6 font-semibold text-gray-600">
					{navItems.map((item) => (
						<li className="mt-3 flex items-center" key={item.slug}>
							<span className="material-icons mr-1">{item.icon}</span>
							<Link to={item.slug}>{item.title}</Link>
						</li>
					))}
				</ul>
			</div>
			<style jsx>{`
				.vertical-menu {
					overflow: auto;
					position: fixed;
					height: 100%;
					width: 230px;
					border-right: 1px solid rgb(179 179 179 / 50%);
				}
			`}</style>
		</>
	);
}
