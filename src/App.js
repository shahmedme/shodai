import React from "react";
import Footer from "./components/Footer";
import HorizontalMenu from "./components/HorizontalMenu";
import LoginPrompt from "./components/LoginPrompt";
import VerticalMenu from "./components/VerticalMenu";

export default function App({ children }) {
	return (
		<>
			<VerticalMenu />
			<div className="app-wrapper">
				<HorizontalMenu />
				<div style={{ height: 64 }}></div>
				<div className="app-content">{children}</div>
				<Footer />
			</div>
			<LoginPrompt />
			<style>{`
				a, a:hover {
					color: inherit;
				}

				.app-content {
					min-height: calc(100vh - 118px);
				}

				@media screen and (min-width: 1024px) {
					.app-wrapper {
						margin-left: 230px;
					}
				}
			`}</style>
		</>
	);
}
