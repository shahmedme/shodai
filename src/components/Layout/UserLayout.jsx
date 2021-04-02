import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import HorizontalMenu from "../HorizontalMenu";
import LoginPrompt from "../LoginPrompt";
import VerticalMenu from "../VerticalMenu";
// import Footer from "../Footer";

export default function UserLayout({ children }) {
	const searchTerm = useSelector((state) => state.misc.searchTerm);
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

				.ant-modal-close:focus {
					outline: none;
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
