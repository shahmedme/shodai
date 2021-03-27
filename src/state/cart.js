import Storage from "../utils/storage";

export const ADD_TO_CART = "ADD_TO_CART";
export const UPDATE_CART = "UPDATE_CART";
export const CLEAR_CART = "CLEAR_CART";

const initialState = Storage.get("cart") || [];

export default function cartReducer(state = initialState, action) {
	switch (action.type) {
		case ADD_TO_CART:
			let cartIds = state.map((item) => item._id);
			if (cartIds.includes(action.payload._id)) {
				return state;
			}
			let newCart = [...state, action.payload];
			Storage.set("cart", newCart);
			return newCart;

		case UPDATE_CART:
			let updatedCart;

			if (action.payload.qty !== 0) {
				updatedCart = Object.assign(
					[],
					state.map((item) => {
						if (item._id === action.payload._id) {
							item.qty = action.payload.qty;
							return item;
						}
						return item;
					})
				);
			} else {
				updatedCart = state.filter((item) => item._id !== action.payload._id);
			}

			Storage.set("cart", updatedCart);
			return updatedCart;

		case CLEAR_CART:
			Storage.remove("cart");
			return [];
		default:
			return state;
	}
}

export const cartAdd = (product) => {
	return {
		type: ADD_TO_CART,
		payload: { ...product, qty: 1 },
	};
};

export const cartIncrement = (product, qty) => {
	return {
		type: UPDATE_CART,
		payload: { ...product, qty: qty + 1 },
	};
};

export const cartDecrement = (product, qty) => {
	return {
		type: UPDATE_CART,
		payload: { ...product, qty: qty - 1 },
	};
};

export const clearCart = () => ({
	type: CLEAR_CART,
});
