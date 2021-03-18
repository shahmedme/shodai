import React from "react";
import HorizontalMenu from "./components/HorizontalMenu";
import VerticalMenu from "./components/VerticalMenu";

export default function App({ children }) {
	return (
		<>
			<VerticalMenu />
			<div style={{ marginLeft: 230 }}>
				<HorizontalMenu />
				<div style={{ height: 64 }}></div>
				{children}
			</div>
		</>
	);
}
