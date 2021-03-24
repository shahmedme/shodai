export const ENABLE_LOGIN_MODE = "ENABLE_LOGIN_MODE";
export const DISABLE_LOGIN_MODE = "DISABLE_LOGIN_MODE";
export const TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR";

const initialState = {
	loginMode: false,
	sidebarIsOpen: false,
};

export default function miscReducer(state = initialState, action) {
	switch (action.type) {
		case ENABLE_LOGIN_MODE:
			return { ...state, loginMode: true };

		case DISABLE_LOGIN_MODE:
			return { ...state, loginMode: false };

		case TOGGLE_SIDEBAR:
			return { ...state, sidebarIsOpen: !state.sidebarIsOpen };

		default:
			return state;
	}
}
