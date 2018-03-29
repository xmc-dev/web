import { token, authorize, refresh } from '../../lib/auth';

export const MAKE_AUTHORIZE = 'MAKE_AUTHORIZE';
export const SET_TOKEN = 'SET_TOKEN';
export const LOGOUT = 'LOGOUT';

/**
 * Initiates the auth flow.
 * @param {string} scope
 */
export function makeAuthorize(scope) {
	return dispatch => {
		const auth = authorize({ scope });
		return dispatch({
			type: MAKE_AUTHORIZE,
			data: auth
		});
	};
}

/**
 * Gets the token after the auth flow was initialized.
 * @param {string} code
 * @param {string} state
 * @param {string} storedState
 * @param {string} verifier
 */
export function getToken(code, state) {
	return (dispatch, getState) => {
		return token(
			code,
			state,
			getState().auth.state,
			getState().auth.verifier
		).then(data => dispatch({ type: SET_TOKEN, token: data }));
	};
}

export function refreshToken() {
	return (dispatch, getState) => {
		return refresh(getState().auth.token.refresh_token).then(data =>
			dispatch({ type: SET_TOKEN, token: data })
		);
	};
}

export const logout = () => ({ type: LOGOUT });
