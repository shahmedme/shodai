import React from "react";
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
				{children}
			</div>
			<LoginPrompt />
			<style>{`
				a, a:hover {
					color: inherit;
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
