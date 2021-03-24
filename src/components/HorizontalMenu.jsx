import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Dropdown, Menu } from "antd";
import { ENABLE_LOGIN_MODE, TOGGLE_SIDEBAR } from "../state/misc";

const menu = (
	<Menu>
		<Menu.Item key="0">
			<Link to="/profile">Profile</Link>
		</Menu.Item>
		<Menu.Item key="1">
			<Link to="/orders">Orders</Link>
		</Menu.Item>
		<Menu.Item key="2">
			<Link to="/settings">Settings</Link>
		</Menu.Item>
		<Menu.Divider />
		<Menu.Item key="3">
			<Link to="/logout">Logout</Link>
		</Menu.Item>
	</Menu>
);

export default function HorizontalMenu() {
	const user = useSelector((state) => state.auth.user);
	const cart = useSelector((state) => state.cart);
	const dispatch = useDispatch();

	const enableLoginMode = () => {
		dispatch({ type: ENABLE_LOGIN_MODE });
	};

	const toggleSidebar = () => {
		dispatch({ type: TOGGLE_SIDEBAR });
	};

	return (
		<>
			<nav>
				<div className="mx-auto px-3 sm:px-6">
					<div className="flex items-center justify-between h-16">
						<div className="lg:hidden text-gray-800">
							<span className="material-icons mt-2" onClick={toggleSidebar}>
								menu
							</span>
						</div>
						<div className="flex-1 flex items-center sm:items-stretch sm:justify-start">
							<div className="flex items-center text-gray-400 ml-2 lg:ml-0">
								<span className="material-icons mt-1 hidden lg:block">
									search
								</span>
								<input
									className="w-60 focus:border-gray-300 bg-white h-10 pl-2 pr-10 rounded-lg text-sm focus:outline-none"
									type="search"
									name="search"
									placeholder="Search for items or brands"
								/>
							</div>
						</div>
						<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
							<Link
								to="/cart"
								className="md:mr-3 mt-1 text-gray-400 focus:outline-none relative"
							>
								<span className="material-icons">shopping_cart</span>
								{cart.length ? (
									<span className="bg-green-600 px-1 text-xs text-white rounded-3xl absolute count">
										{cart.length}
									</span>
								) : null}
							</Link>
							<div className="ml-3 relative">
								<div>
									{!user ? (
										<div className="w-24" />
									) : user._id ? (
										<Dropdown overlay={menu} trigger={["click"]}>
											<div>
												<button
													className="hidden lg:flex items-center text-sm text-gray-500 p-0.5 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-600 focus:ring-white"
													id="user-menu"
													aria-haspopup="true"
												>
													<img
														className="h-8 w-8 rounded-full"
														src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
														alt=""
													/>
													<h3 className="font-medium ml-2 mb-0">
														{user.firstName + " " + user.lastName}
													</h3>
													<span className="material-icons">
														keyboard_arrow_down
													</span>
												</button>
												<div className="text-gray-400 mt-1.5 mr-1 lg:hidden">
													<span
														className="material-icons -mt-0.5"
														style={{ fontSize: 26 }}
													>
														account_circle
													</span>
												</div>
											</div>
										</Dropdown>
									) : (
										<>
											<button
												className="py-1.5 px-5 bg-yellow-200 rounded font-semibold hidden md:block focus:outline-none"
												onClick={enableLoginMode}
											>
												Login
											</button>
											<div className="text-gray-400 mt-0.5 md:hidden focus:outline-none">
												<span
													className="material-icons"
													style={{ fontSize: 25 }}
												>
													account_circle
												</span>
											</div>
										</>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</nav>
			<style jsx>{`
				nav {
					border-bottom: 1px solid rgba(0, 0, 0, 0.09);
					position: fixed;
					top: 0;
					background: white;
					z-index: 999;
					width: 100%;
				}

				.count {
					top: -5px;
					right: -4px;
				}

				@media screen and (min-width: 1024px) {
					nav {
						width: calc(100% - 230px);
					}
				}
			`}</style>
		</>
	);
}
