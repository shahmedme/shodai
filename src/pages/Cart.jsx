import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import CartItem from "../components/CartItem";
import NotFound from "../components/NotFound";
import { coreAxios } from "../utils/axios";
import { message } from "antd";
import { clearCart } from "../state/cart";

export default function Cart() {
	const cartItems = useSelector((state) => state.cart);
	const user = useSelector((state) => state.auth.user);
	const subTotal = cartItems.reduce((a, b) => a + b.price * b.qty, 0);
	const initialValues = {
		name: "",
		email: "",
		street: "",
		city: "",
		country: "",
		zip: "",
		card_no: "",
		expire_date: "",
		cvc: "",
	};
	const dispatch = useDispatch();
	const history = useHistory();

	const handleFormSubmit = (values) => {
		let orderItems = cartItems.map((item) => ({
			productId: item._id,
			quantity: item.qty,
		}));

		if (!user?._id) {
			message.error("Please Login First");
		} else if (values.street && values.email) {
			coreAxios
				.post("/api/orders", {
					shippingAddress: values.street,
					orderEmail: values.email,
					orderItems,
				})
				.then((res) => {
					message.success("Order Created Successfully");
					dispatch(clearCart());
					history.push("/orders");
				})
				.catch((err) => {
					message.error("Something wrong while creating order");
					console.log(err);
				});
		} else {
			message.error("Please Provide Shipping Information");
		}
	};

	return (
		<div>
			{cartItems.length ? (
				<div className="px-7 py-5 lg:py-10 flex flex-col lg:flex-row">
					<div className="lg:w-3/4 lg:mr-8">
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
					<div className="lg:w-1/4 mt-10 lg:mt-0">
						<div className="payment-wrapper">
							<div className="bg-gray-700 rounded-md px-5 py-5">
								<div className="rounded shadow-xl">
									<Formik
										initialValues={initialValues}
										onSubmit={handleFormSubmit}
									>
										<Form>
											<p className="text-white font-xl font-semibold">
												Shipping information
											</p>
											<div>
												<Field
													className="w-full p-2 text-gray-700 bg-gray-200 rounded focus:outline-none"
													name="name"
													type="text"
													required=""
													placeholder="Your Name"
												/>
											</div>
											<div className="mt-2">
												<Field
													className="w-full p-2 text-gray-700 bg-gray-200 rounded focus:outline-none"
													name="email"
													type="text"
													required=""
													placeholder="Your Email"
													aria-label="Email"
												/>
											</div>
											<div className="mt-2">
												<Field
													className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded focus:outline-none"
													name="street"
													type="text"
													required=""
													placeholder="Street"
													aria-label="Street"
												/>
											</div>
											<div className="mt-2">
												<Field
													className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded focus:outline-none"
													name="city"
													type="text"
													required=""
													placeholder="City"
													aria-label="City"
												/>
											</div>
											<div className="inline-block mt-2 w-1/2 pr-1">
												<Field
													className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded focus:outline-none"
													name="country"
													type="text"
													required=""
													placeholder="Country"
													aria-label="Country"
												/>
											</div>
											<div className="inline-block mt-2 pl-1 w-1/2">
												<Field
													className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded focus:outline-none"
													name="zip"
													type="text"
													required=""
													placeholder="Zip"
													aria-label="Zip"
												/>
											</div>
											<p className="mt-4 text-white font-semibold">
												Payment information
											</p>
											<div className="">
												<Field
													className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded focus:outline-none"
													name="card_no"
													type="text"
													required=""
													placeholder="Card Number"
													aria-label="Cart Number"
												/>
											</div>
											<div className="inline-block mt-2 w-1/2 pr-1">
												<Field
													className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded focus:outline-none"
													name="expire_date"
													type="text"
													required=""
													placeholder="MM/YY"
												/>
											</div>
											<div className="inline-block mt-2 pl-1 w-1/2">
												<Field
													className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded focus:outline-none"
													name="cvc"
													type="text"
													required=""
													placeholder="CVC"
												/>
											</div>
											<div className="flex justify-center mt-5">
												<button
													type="submit"
													className="bg-yellow-200 text-black w-full py-3 rounded-md font-bold text-sm focus:outline-none"
												>
													Pay Now
												</button>
											</div>
										</Form>
									</Formik>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className="p-12">
					<NotFound
						msg="Your Cart is Empty"
						navText="Add Items to Cart"
						icon="shopping_basket"
					/>
				</div>
			)}

			<style jsx>{`
				.payment-wrapper {
					position: sticky;
					top: 80px;
				}
			`}</style>
		</div>
	);
}
