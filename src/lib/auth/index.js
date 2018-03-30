// This is to make eslint shut up about the oauth2 params
/* eslint-disable camelcase */
import shajs from 'sha.js';
import { OAUTH2 } from '../../config';
import { objectToParams } from '../query-params';
import store from '../../store';
import { refreshToken } from '../../actions/auth';

function base64URLEncode(str) {
	/* eslint-disable no-div-regex */
	return str
		.replace(/\+/g, '-')
		.replace(/\//g, '_')
		.replace(/=/g, '');
	/* eslint-enable no-div-regex */
}

function randomBase64(len) {
	const arr = new Uint8Array(len);
	crypto.getRandomValues(arr);

	return base64URLEncode(btoa(String.fromCharCode.apply(null, arr)));
}

/**
 * @typedef {Object} AuthorizeData
 * @property {string} state
 * @property {string} verifier
 * @property {string} url
 */

/**
 * Initializes the authorization procedure using
 * the OAuth2 Authorization Code PKCE flow.
 *
 * @param {Object} opts Options for the authorization procedure.
 * @param {string} opts.scope OAuth2 scope to request.
 *
 * @returns {AuthorizeData} Authorization url where the user should be redirected.
 */
export function authorize({ scope }) {
	const verifier = randomBase64(43);

	const challenge = base64URLEncode(
		shajs('sha256')
			.update(verifier)
			.digest('base64')
	);

	const state = randomBase64(10);

	const reqOpts = {
		scope,
		state,
		response_type: 'code',
		client_id: OAUTH2.clientId,
		code_challenge: challenge,
		code_challenge_method: 'S256',
		redirect_uri: encodeURI(OAUTH2.redirectUri)
	};

	const ret = {
		state,
		verifier,
		url: OAUTH2.url + '/authorize?' + objectToParams(reqOpts)
	};

	return ret;
}

/**
 * Completes the OAuth2 autorization code PKCE flow.
 *
 * @param {string} code Authorization code.
 * @param {string} state State to be checked with the saved one.
 * @returns {Promise<Object>} Promise that holds the final token
 */
export function token(code, state, storedState, verifier) {
	if (state !== storedState) {
		throw new Error('State doesn\'t match');
	}

	const reqOpts = {
		code,

		grant_type: 'authorization_code',
		redirect_uri: encodeURI(OAUTH2.redirectUri),
		client_id: OAUTH2.clientId,
		client_secret: '',
		code_verifier: verifier
	};

	const url = OAUTH2.url + '/token?' + objectToParams(reqOpts);

	return fetch(url)
		.then(data => {
			if (!data.ok) {
				throw new Error(data.statusText);
			}
			return data.json();
		})
		.then(data => {
			if ('error' in data) {
				throw data;
			}
			return data;
		});
}

export function refresh(refreshToken) {
	const reqOpts = {
		grant_type: 'refresh_token',
		refresh_token: refreshToken,
		client_id: OAUTH2.clientId,
		client_secret: ''
	};
	const url = OAUTH2.url + '/token?' + objectToParams(reqOpts);

	return fetch(url)
		.then(data => {
			if (!data.ok) {
				throw new Error(data.statusText);
			}
			return data.json();
		})
		.then(data => {
			if ('error' in data) {
				throw new Error(`${data.error}: ${data.error_description}`);
			}
			return data;
		});
}

/**
 * Returns the JWT from localStorage.
 *
 * @returns {string} JWT token.
 */
export function getTokenString() {
	const tok = store.getState().auth.token;
	if (tok) {
		return tok.access_token;
	}
	return '';
}

export function getDecodedJWT() {
	const tok = store.getState().auth.decodedJWT;
	return tok || null;
}

export function doRefresh() {
	return store.dispatch(refreshToken());
}
/* eslint-enable camelcase */
