import React from "react";
import Lottie from "react-lottie";
import animationData from "../assets/lotties/rocket.json";

export default function Loader() {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: animationData,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
		},
	};

	return <Lottie options={defaultOptions} height={100} width={100} />;
}
