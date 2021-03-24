import React from "react";
import { useDispatch } from "react-redux";
import { cartDecrement, cartIncrement } from "../state/cart";

export default function CounterButton({ product }) {
	const dispatch = useDispatch();

	const handleIncrement = () => {
		dispatch(cartIncrement(product, product.qty));
	};

	const handleDecrement = () => {
		dispatch(cartDecrement(product, product.qty));
	};

	return (
		<>
			<div className="flex items-center mt-2 rounded-md overflow-hidden font-semibold hover:bg-yellow-200 hover:border-white focus:outline-none">
				<button
					className="px-3 lg:px-4 py-2.5 bg-yellow-200 focus:outline-none"
					onClick={handleDecrement}
				>
					-
				</button>
				<span className="flex-grow text-center py-2.5 bg-yellow-200 count">
					{product.qty} in bag
				</span>
				<button
					className="px-3 lg:px-4 py-2.5 bg-yellow-200 focus:outline-none"
					onClick={handleIncrement}
				>
					+
				</button>
			</div>
			<style jsx>{`
				.count {
					border-left: 1px solid rgb(179 179 179 / 50%);
					border-right: 1px solid rgb(179 179 179 / 50%);
					line-height: auto;
				}
			`}</style>
		</>
	);
}
