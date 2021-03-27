import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TOGGLE_SIDEBAR } from "../state/misc";

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
	const sidebarIsOpen = useSelector((state) => state.misc.sidebarIsOpen);
	const dispatch = useDispatch();

	const toggleSidebar = () => {
		dispatch({ type: TOGGLE_SIDEBAR });
	};

	if (sidebarIsOpen) {
		window.document.body.style.overflow = "hidden";
	} else {
		window.document.body.style.overflow = "unset";
	}

	return (
		<>
			<div className={!sidebarIsOpen ? "bg-shadow" : "bg-shadow active"}>
				<div
					className={
						!sidebarIsOpen
							? "vertical-menu-wrapper"
							: "vertical-menu-wrapper active"
					}
				>
					<div className="px-5 pt-3 vertical-menu">
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
									<Link to={"/category/" + item.slug}>{item.title}</Link>
								</li>
							))}
						</ul>
					</div>
					<div className="h-screen flex-grow" onClick={toggleSidebar}></div>
				</div>
			</div>
			<style jsx>{`
				.vertical-menu-wrapper {
					overflow: auto;
					position: fixed;
					height: 100vh;
					width: 100%;
					top: 0;
					left: -100%;
					z-index: 999;
					display: flex;
					transition: 350ms;
				}

				.vertical-menu-wrapper.active {
					left: 0;
				}

				.vertical-menu {
					width: 230px;
					height: 100%;
					border-right: 1px solid rgb(179 179 179 / 50%);
					background: white;
				}

				.bg-shadow {
					position: absolute;
					transition: 250ms;
					z-index: 998;
				}

				.bg-shadow.active {
					background: rgba(0, 0, 0, 0.4);
					width: 100%;
					height: 10000px;
				}

				@media screen and (min-width: 1024px) {
					.vertical-menu-wrapper {
						overflow: auto;
						position: fixed;
						height: 100vh;
						width: 230px;
						top: 0;
						left: 0;
						z-index: 999;
						// display: flex;
						// transition: 350ms;
					}
				}
			`}</style>
		</>
	);
}
