import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { coreAxios } from "../utils/axios";

export default function Category() {
	const [products, setProducts] = useState();
	const cart = useSelector((state) => state.cart);
	let { categorySlug } = useParams();

	useEffect(() => {
		coreAxios
			.get(`/api/category/${categorySlug}`)
			.then((res) => setProducts(res.data))
			.catch((err) => console.log(err));
	}, [categorySlug]);

	return (
		<div>
			{products ? (
				products.length ? (
					<div className="flex flex-wrap md:mt-4 mx-3">
						{products.map((product) => (
							<div
								key={product._id}
								className="w-2/4 md:w-1/4 lg:w-1/3 xl:w-1/4 px-2"
							>
								<ProductCard product={product} cart={cart} />
							</div>
						))}
					</div>
				) : (
					<div className="flex justify-center items-center h-96">
						<div className="text-center">
							<h1 className="text-2xl">No Product Found :(</h1>
							<Link
								to="/"
								className="px-3 py-2 mt-3 bg-yellow-200 rounded font-semibold inline-flex items-center"
							>
								<span className="material-icons">arrow_back</span>
								<span className="ml-1">Go to Home Page</span>
							</Link>
						</div>
					</div>
				)
			) : (
				<div className="h-screen flex items-center justify-center">
					<Spin />
				</div>
			)}
		</div>
	);
}
