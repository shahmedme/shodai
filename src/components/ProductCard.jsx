import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Skeleton, Spin } from "antd";
import { Link } from "react-router-dom";
import { cartAdd } from "../state/cart";
import CounterButton from "./CounterButton";

export default function ProductCard({ product: propProduct, cart }) {
	const [product, setProduct] = useState();
	const dispatch = useDispatch();

	useEffect(() => {
		let tempCartItem = cart.find(
			(cartItem) => cartItem._id === propProduct._id
		);

		if (tempCartItem) {
			propProduct.qty = tempCartItem.qty;
		} else {
			propProduct.qty = 0;
		}

		setProduct({ ...propProduct });
	}, [cart, propProduct]);

	const handleAddToCart = () => {
		dispatch(cartAdd(product));
	};

	return (
		<>
			<div className="rounded overflow-hidden shadow my-2 px-3 md:px-4 product">
				<div className="h-2/5 lg:h-2/4 overflow-hidden pt-2">
					{product ? (
						<Link to={`/product/${product.slug}`}>
							<img
								className="w-full h-auto thumb"
								src={
									product.image
										? product.image
										: "https://www.chanchao.com.tw/IPF/images/default.jpg"
								}
								alt={product.title}
							/>
						</Link>
					) : (
						<Spin />
					)}
				</div>
				<div className="h-3/5 lg:h-2/4 py-4 flex flex-col">
					{product ? (
						<>
							<Link
								to={`/product/${product.slug}`}
								className="font-semibold text-sm lg:text-base mb-2"
							>
								{product.title.substr(0, 35)}
							</Link>
							<span className="flex-grow">${product.price}</span>
							{product.qty ? (
								<CounterButton product={product} qty={product.qty} />
							) : (
								<button
									className="border-2 py-2 mt-2 rounded-md font-semibold hover:bg-yellow-200 hover:border-white focus:outline-none"
									onClick={handleAddToCart}
								>
									Add to bag
								</button>
							)}
						</>
					) : (
						<Skeleton />
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
