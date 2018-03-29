import { SET_TOKEN, MAKE_AUTHORIZE, LOGOUT } from '../../actions/auth';
import jwtDecode from 'jwt-decode';

const initialState = {
	state: '',
	verifier: '',
	url: '',
	token: {},
	decodedJWT: null
};

export default function authReducer(state = initialState, action) {
	switch (action.type) {
		case MAKE_AUTHORIZE:
			return { ...state, ...action.data };
		case SET_TOKEN:
			return {
				token: action.token,
				decodedJWT: jwtDecode(action.token.access_token)
			};
		case LOGOUT:
			return { ...initialState };
		default:
			return state;
	}
}
