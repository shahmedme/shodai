import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { cartAdd } from "../state/cart";
import CounterButton from "./CounterButton";

export default function ProductCard(props) {
	const dispatch = useDispatch();

	const handleAddToCart = () => {
		dispatch(cartAdd(props.product));
	};

	return (
		<>
			<div className="rounded overflow-hidden shadow my-2 px-3 md:px-4 product">
				<div className="h-2/5 lg:h-2/4 overflow-hidden pt-2">
					<Link to={`/product/${props.product.slug}`}>
						<img
							className="w-full h-auto thumb"
							src={
								props.product.image
									? props.product.image
									: "https://www.chanchao.com.tw/IPF/images/default.jpg"
							}
							alt={props.product.title}
						/>
					</Link>
				</div>
				<div className="h-3/5 lg:h-2/4 py-4 flex flex-col">
					<Link
						to={`/product/${props.product.slug}`}
						className="font-semibold text-sm lg:text-base mb-2"
					>
						{props.product.title.substr(0, 35)}
					</Link>
					<span className="flex-grow">${props.product.price}</span>
					{props.product.qty ? (
						<CounterButton product={props.product} qty={props.product.qty} />
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
					height: 300px;
				}

				.thumb {
					height: 100%;
					object-fit: contain;
				}

				@media screen and (min-width: 768px) {
					.product {
						height: 280px;
					}
				}

				@media screen and (min-width: 1024px) {
					.product {
						height: 350px;
					}
				}
			`}</style>
		</>
	);
}
