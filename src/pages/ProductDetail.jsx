import { Skeleton, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import CounterButton from "../components/CounterButton";
import { cartAdd } from "../state/cart";
import { coreAxios } from "../utils/axios";

export default function ProductDetail() {
	const [product, setProduct] = useState();
	const { slug } = useParams();
	const cart = useSelector((state) => state.cart);

	const dispatch = useDispatch();

	useEffect(() => {
		coreAxios
			.get("/api/product", {
				params: {
					slug: slug,
				},
			})
			.then((res) => {
				let tempProduct = cart.find((item) => item._id === res.data._id);

				if (tempProduct) {
					setProduct({ ...res.data, qty: tempProduct.qty });
				} else {
					setProduct(res.data);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	useEffect(() => {
		let tempProduct = product && cart.find((item) => item._id === product._id);

		if (tempProduct) {
			setProduct({ ...product, qty: tempProduct.qty });
		} else {
			setProduct(product && { ...product, qty: 0 });
		}
	}, [cart]);

	const handleAddToCart = () => {
		dispatch(cartAdd(product));
	};

	return (
		<>
			<div className="p-5 md:p-10">
				<div className="flex flex-col md:flex-row">
					<div className="md:w-2/4 md:pr-5">
						<div className="shadow rounded p-5 flex justify-center items-center img-wrapper">
							{product ? (
								<img src={product.image} alt="" className="thumb" />
							) : (
								<Spin />
							)}
						</div>
					</div>
					<div className="md:w-2/4 mt-5 md:mt-0 md:pl-5">
						{product ? (
							<div>
								<h2 className="text-xl font-bold">{product.title}</h2>
								<p className="text-gray-500 uppercase mt-5 font-semibold">
									Product Details
								</p>
								<p className="font-medium">
									{product.description.substr(0, 200)}
								</p>
								<p className="text-gray-500 uppercase mt-5 font-semibold">
									Price
								</p>
								<p className="font-medium text-2xl">${product.price}</p>
								{product.qty ? (
									<div className="w-52">
										<CounterButton product={product} />
									</div>
								) : (
									<>
										<button
											className="px-5 py-2 bg-yellow-200 rounded font-semibold inline-flex items-center focus:outline-none"
											onClick={handleAddToCart}
										>
											<span className="material-icons">shopping_bag</span>
											<span className="ml-1 mt-0.5">Add to bag</span>
										</button>
										<button className="px-5 py-2 ml-2 bg-blue-200 rounded font-semibold inline-flex items-center focus:outline-none">
											<span className="material-icons">bookmark</span>
											<span className="ml-1 mt-0.5">Save for later</span>
										</button>
									</>
								)}
							</div>
						) : (
							<>
								<Skeleton paragraph={{ rows: 4 }} />
								<Skeleton
									title={false}
									paragraph={{ rows: 4 }}
									className="mt-5"
								/>
							</>
						)}
					</div>
				</div>
				{product ? (
					<div className="mt-5">
						<h4>Description: </h4>
						<div className="font-thin">{product.description}</div>
					</div>
				) : null}
			</div>
			<style jsx>{`
				.img-wrapper {
					height: 200px;
				}

				.thumb {
					height: 100%;
					width: 100%;
					object-fit: contain;
				}

				@media screen and (min-width: 768px) {
					.img-wrapper {
						height: 350px;
					}
				}
			`}</style>
		</>
	);
}
