import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { coreAxios } from "../utils/axios";

function Home() {
	const [products, setProducts] = useState([]);
	const cart = useSelector((state) => state.cart);

	useEffect(() => {
		coreAxios
			.get("api/products")
			.then((res) => {
				let tempProducts = res.data?.map((item) => {
					let tempCartItem = cart.find((cartItem) => cartItem._id === item._id);

					if (tempCartItem) {
						item.qty = tempCartItem.qty;
					} else {
						item.qty = 0;
					}

					return item;
				});
				setProducts(tempProducts);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [cart]);

	return (
		<div>
			<section className="hero">
				<div className="py-32 flex justify-center">
					<form className="w-2/4 relative">
						<input
							type="text"
							placeholder="Search for items or brands"
							className="rounded-md w-full px-3 py-2 focus:outline-none search"
						/>
						<span className="material-icons absolute top-2.5 right-2.5 text-gray-500">
							search
						</span>
					</form>
				</div>
			</section>

			<section className="featured p-4">
				<h2 className="ml-2 mt-2 font-bold text-2xl text-gray-700">
					Featured Products
				</h2>
				<div className="flex flex-wrap mt-4">
					{products.map((product) => (
						<div key={product._id} className="w-1/4 px-2">
							<ProductCard product={product} />
						</div>
					))}
				</div>
			</section>

			<style>{`
                .hero {
                    background: url('https://t4.ftcdn.net/jpg/03/14/32/75/360_F_314327563_53uk7HoI85BWSZ01Nmyl2P3GSLra1H9x.jpg') no-repeat;
                    background-position: right;
                    background-size: cover;
                }

                .hero .search {
                    border: 1px solid rgb(179 179 179 / 50%);
                }
            `}</style>
		</div>
	);
}

export default Home;
