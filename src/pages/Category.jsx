import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import NotFound from "../components/NotFound";
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

		return () => {
			setProducts();
		};
	}, [categorySlug]);

	return (
		<div>
			{products ? (
				products.length ? (
					<div className="flex flex-wrap mt-2 md:mt-4 mx-3">
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
					<NotFound msg="No Product Found :(" />
				)
			) : (
				<div className="h-screen flex items-center justify-center">
					<Spin />
				</div>
			)}
		</div>
	);
}
