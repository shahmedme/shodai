import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { UPDATE_CART } from "../state/cart";
import Counter from "./Counter";

export default function CartItem({ data }) {
	const dispatch = useDispatch();

	const handleIncrement = () => {
		dispatch({
			type: UPDATE_CART,
			payload: { ...data, qty: data.qty + 1 },
		});
	};

	const handleDecrement = () => {
		dispatch({
			type: UPDATE_CART,
			payload: { ...data, qty: data.qty - 1 },
		});
	};

	const handleAdjustment = (qty) => {
		dispatch({
			type: UPDATE_CART,
			payload: { ...data, qty },
		});
	};

	return (
		<>
			<div>
				<div className="flex items-center my-5">
					<Link to={`/product/${data.slug}`}>
						<img src={data.image} alt={data.title} className="thumb" />
					</Link>
					<h3 className="font-semibold w-4/6 ml-5 flex-grow">
						<Link to={`/product/${data.slug}`}>{data.title}</Link>
					</h3>
					<Counter
						count={data.qty}
						{...{ handleIncrement, handleDecrement, handleAdjustment }}
					/>
					<span className="text-right price">
						${(data.price * data.qty).toFixed(2)}
					</span>
				</div>
				<hr />
			</div>
			<style>{`
                .thumb {
                    width: 60px;
                    height: 60px;
                    object-fit: cover;
                    border-radius: 10px;
                }

				.price {
					width: 90px;
				}
            `}</style>
		</>
	);
}
