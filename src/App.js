import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
// import Footer from "./components/Footer";
import HorizontalMenu from "./components/HorizontalMenu";
import LoginPrompt from "./components/LoginPrompt";
import VerticalMenu from "./components/VerticalMenu";
import { loadUser } from "./state/auth";

export default function App({ children }) {
	const searchTerm = useSelector((state) => state.misc.searchTerm);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadUser());
	}, []);

	return (
		<>
			<VerticalMenu />
			<div className="app-wrapper">
				<HorizontalMenu />
				<div style={{ height: 64 }}></div>
				<div className="app-content">{children}</div>
				{/* <Footer /> */}
			</div>
			<LoginPrompt />
			{searchTerm.length ? <Redirect to={`/search?q=${searchTerm}`} /> : null}
			<style>{`
				a, a:hover {
					color: inherit;
				}

				// .app-content {
				// 	min-height: calc(100vh - 118px);
				// }

				@media screen and (min-width: 1024px) {
					.app-wrapper {
						margin-left: 230px;
					}
				}
			`}</style>
		</>
	);
}
