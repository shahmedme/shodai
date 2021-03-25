import { coreAxios } from "../utils/axios";

export const SET_PRODUCTS = "SET_PRODUCTS";

export default function productReducer(state = {}, action) {
	switch (action.type) {
		case SET_PRODUCTS:
			return action.payload;
		default:
			return state;
	}
}

export const loadProducts = () => (dispatch) => {
	coreAxios
		.get("api/products")
		.then((res) => {
			dispatch({
				type: SET_PRODUCTS,
				payload: res.data,
			});
		})
		.catch((err) => {
			console.log(err);
		});
};
