import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NotFound from "../components/NotFound";
import ProductCard from "../components/ProductCard";
import { coreAxios } from "../utils/axios";

export default function SearchResult({ location }) {
	const [searchResult, setSearchResult] = useState();
	const cart = useSelector((state) => state.cart);
	let searchQuery = location.search.substr(3, location.search.length);

	useEffect(() => {
		coreAxios
			.get(`api/product/search?q=${searchQuery}`)
			.then((res) => {
				setSearchResult(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [searchQuery]);

	return (
		<div>
			{searchResult ? (
				searchResult.length ? (
					<div className="flex flex-wrap md:mt-4 mx-3">
						{searchResult.map((product) => (
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
			) : null}
		</div>
	);
}
