import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";

export default function Cart() {
	const cartItems = useSelector((state) => state.cart);
	const subTotal = cartItems.reduce((a, b) => a + b.price * b.qty, 0);

	return (
		<div>
			{cartItems.length ? (
				<div className="px-7 py-10 flex">
					<div className="w-3/4 mr-8">
						<div className="font-semibold text-lg">Shopping Cart</div>

						{cartItems.map((cartItem) => (
							<CartItem key={cartItem._id} data={cartItem} />
						))}

						<div className="flex justify-between items-center mt-10">
							<div className="flex items-center">
								<span className="material-icons">west</span>
								<Link to="/" className="text-blue-700 font-semibold ml-2">
									Continue Shopping
								</Link>
							</div>
							<div className="flex items-center">
								<p className="text-sm text-gray-700 m-0">Subtotal:</p>
								&nbsp;&nbsp;
								<h4 className="font-semibold m-0">${subTotal.toFixed(2)}</h4>
							</div>
						</div>
					</div>
					<div className="w-1/4">
						<div className="bg-gray-700 rounded-md px-5 py-5">
							<div>
								<form className="max-w-xl rounded shadow-xl">
									<p className="text-white font-xl font-semibold">
										Customer information
									</p>
									<div className="">
										<input
											className="w-full p-2 text-gray-700 bg-gray-200 rounded"
											name="cus_name"
											type="text"
											required=""
											placeholder="Your Name"
										/>
									</div>
									<div className="mt-2">
										<input
											className="w-full p-2 text-gray-700 bg-gray-200 rounded"
											name="cus_email"
											type="text"
											required=""
											placeholder="Your Email"
											aria-label="Email"
										/>
									</div>
									<div className="mt-2">
										<input
											className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
											name="cus_email"
											type="text"
											required=""
											placeholder="Street"
											aria-label="Email"
										/>
									</div>
									<div className="mt-2">
										<input
											className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
											name="cus_email"
											type="text"
											required=""
											placeholder="City"
											aria-label="Email"
										/>
									</div>
									<div className="inline-block mt-2 w-1/2 pr-1">
										<input
											className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
											name="cus_email"
											type="text"
											required=""
											placeholder="Country"
											aria-label="Email"
										/>
									</div>
									<div className="inline-block mt-2 -mx-1 pl-1 w-1/2">
										<input
											className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
											name="cus_email"
											type="text"
											required=""
											placeholder="Zip"
											aria-label="Email"
										/>
									</div>
									<p className="mt-4 text-white font-semibold">
										Payment information
									</p>
									<div className="">
										<input
											className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
											id="cus_name"
											name="cus_name"
											type="text"
											required=""
											placeholder="Card Number"
											aria-label="Name"
										/>
									</div>
									<div className="inline-block mt-2 w-1/2 pr-1">
										<input
											className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
											name="cus_email"
											type="text"
											required=""
											placeholder="MM/YY"
										/>
									</div>
									<div className="inline-block mt-2 -mx-1 pl-1 w-1/2">
										<input
											className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
											name="cus_email"
											type="text"
											required=""
											placeholder="CVC"
										/>
									</div>
								</form>
							</div>
							<div className="flex justify-center mt-5">
								<button className="bg-yellow-200 text-black w-full py-3 rounded-md font-bold text-sm focus:outline-none">
									Pay Now
								</button>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className="p-12">
					<h3 className="font-bold">Your Cart is Empty</h3>
				</div>
			)}

			<style jsx>{`
				input:focus {
					outline: none;
				}
			`}</style>
		</div>
	);
}
