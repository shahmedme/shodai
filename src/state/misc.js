export const ENABLE_LOGIN_MODE = "ENABLE_LOGIN_MODE";
export const DISABLE_LOGIN_MODE = "DISABLE_LOGIN_MODE";
export const TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR";
export const SET_SEARCH_TERM = "SET_SEARCH_TERM";

const initialState = {
	loginMode: false,
	sidebarIsOpen: false,
	searchTerm: "",
};

export default function miscReducer(state = initialState, action) {
	switch (action.type) {
		case ENABLE_LOGIN_MODE:
			return { ...state, loginMode: true };

		case DISABLE_LOGIN_MODE:
			return { ...state, loginMode: false };

		case TOGGLE_SIDEBAR:
			return { ...state, sidebarIsOpen: !state.sidebarIsOpen };

		case SET_SEARCH_TERM:
			return { ...state, searchTerm: action.payload };

		default:
			return state;
	}
}
