import { SET_TOKEN, MAKE_AUTHORIZE, LOGOUT } from '../../actions/auth';

const initialState = {
	state: '',
	verifier: '',
	url: '',
	token: {}
};

export default function authReducer(state = initialState, action) {
	switch (action.type) {
		case MAKE_AUTHORIZE:
			return { ...state, ...action.data };
		case SET_TOKEN:
			return { token: action.token };
		case LOGOUT:
			return { ...initialState };
		default:
			return state;
	}
}
