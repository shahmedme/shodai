import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { coreAxios } from "../utils/axios";
import BagIcon from "../assets/images/shodai.png";

export default function VerticalMenu() {
	const sidebarIsOpen = useSelector((state) => state.misc.sidebarIsOpen);
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		coreAxios
			.get("api/products/categories")
			.then((res) => setCategories(res.data))
			.catch((err) => console.log(err));
	}, []);

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
						<Link
							to="/"
							className="font-semibold text-3xl flex items-center justify-center gap-2 logo"
						>
							<img src={BagIcon} alt="shodai" className="w-9 h-auto" /> Shodai
						</Link>
						<ul className="navbar mt-7 font-semibold text-gray-600">
							<li className="mt-3 flex items-center">
								<span className="material-icons mr-1">apps</span>
								<Link to="/category/all">All Category</Link>
							</li>
							{categories?.map((item) => (
								<li className="mt-3 flex items-center" key={item.slug}>
									<span className="material-icons mr-1">{item.icon}</span>
									<Link to={"/category/" + item.slug}>{item.title}</Link>
								</li>
							))}
						</ul>
					</div>
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
