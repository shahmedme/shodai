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
				<div className="p-10 flex">
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
								<p className="text-sm text-gray-700">Subtotal:</p>&nbsp;&nbsp;
								<h4 className="font-semibold">${subTotal.toFixed(2)}</h4>
							</div>
						</div>
					</div>
					<div className="w-1/4">
						<div className="bg-gray-700 rounded-md p-5">
							<p style={{ height: 400 }}></p>
							<div className="flex justify-center">
								<button className="bg-yellow-200 text-black px-16 py-3 rounded-md font-bold text-sm">
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
		</div>
	);
}
