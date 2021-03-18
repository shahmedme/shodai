import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ADD_TO_CART, UPDATE_CART } from "../state/cart";

export default function ProductCard(props) {
	const [qty, setQty] = useState(props.product.qty);
	const dispatch = useDispatch();

	useEffect(() => {
		setQty(props.product.qty);
	}, [props]);

	const handleAddToCart = () => {
		dispatch({
			type: ADD_TO_CART,
			payload: { ...props.product, qty: 1 },
		});
	};

	const handleIncrement = () => {
		dispatch({
			type: UPDATE_CART,
			payload: { ...props.product, qty: qty + 1 },
		});
	};

	const handleDecrement = () => {
		dispatch({
			type: UPDATE_CART,
			payload: { ...props.product, qty: qty - 1 },
		});
	};

	return (
		<>
			<div className="max-w-xs rounded overflow-hidden shadow my-2 product">
				<div className="wrappper h-2/4 overflow-hidden pt-2 px-3">
					<img
						className="w-full h-auto thumb"
						src={
							props.product.image
								? props.product.image
								: "https://www.chanchao.com.tw/IPF/images/default.jpg"
						}
						alt={props.product.title}
					/>
				</div>
				<div className="h-2/4 px-4 py-4 flex flex-col">
					<Link to={"slug"} className="font-semibold text-base mb-2">
						{props.product.title.substr(0, 35)}
					</Link>
					<span className="flex-grow">${props.product.price}</span>
					{props.product.qty ? (
						<div className="flex items-center mt-2 rounded-md overflow-hidden font-semibold hover:bg-yellow-200 hover:border-white focus:outline-none">
							<button
								className="px-4 py-2.5 bg-yellow-200 focus:outline-none"
								onClick={handleDecrement}
							>
								-
							</button>
							<span className="flex-grow text-center py-2.5 bg-yellow-200 count">
								{qty} in bag
							</span>
							<button
								className="px-4 py-2.5 bg-yellow-200 focus:outline-none"
								onClick={handleIncrement}
							>
								+
							</button>
						</div>
					) : (
						<button
							className="border-2 py-2 mt-2 rounded-md font-semibold hover:bg-yellow-200 hover:border-white focus:outline-none"
							onClick={handleAddToCart}
						>
							Add to bag
						</button>
					)}
				</div>
			</div>
			<style jsx>{`
				.product {
					height: 350px;
				}

				.thumb {
					height: 100%;
					object-fit: contain;
				}

				.count {
					border-left: 1px solid rgb(179 179 179 / 50%);
					border-right: 1px solid rgb(179 179 179 / 50%);
					line-height: auto;
				}
			`}</style>
		</>
	);
}
