import React from "react";

export default function Counter({
	count,
	handleIncrement,
	handleDecrement,
	handleAdjustment,
}) {
	const updateQty = (e) => {
		if (e.target.value > 0) {
			handleAdjustment(e.target.value);
		}
	};

	return (
		<>
			<div className="flex items-center">
				<button className="focus:outline-none" onClick={handleIncrement}>
					+
				</button>
				<input
					value={count}
					className="value text-center text-sm focus:outline-none mx-2"
					onChange={updateQty}
				/>
				<button className="focus:outline-none" onClick={handleDecrement}>
					-
				</button>
			</div>
			<style jsx>{`
				.value {
					width: 35px;
					border: 1px solid rgb(179 179 179 / 50%);
					border-radius: 5px;
					color: rgba(0, 0, 0, 0.7);
				}

				button {
					font-weight: bold;
					font-size: 20px;
					margin-top: -5px;
				}
			`}</style>
		</>
	);
}
