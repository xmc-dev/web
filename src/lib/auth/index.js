import shajs from 'sha.js';
import { OAUTH2 } from '../../config';
import { objectToParams } from '../query-params';

function base64URLEncode(str) {
	return str
		.replace(/\+/g, '-')
		.replace(/\//g, '_')
		.replace(/=/g, '');
}

function randomBase64(len) {
	const arr = new Uint8Array(len);
	crypto.getRandomValues(arr);

	return base64URLEncode(btoa(String.fromCharCode.apply(null, arr)));
}

var navUpdater = function () {};

export function setNavUpdater(func) {
	navUpdater = func;
}

/**
 * Initializes the authorization procedure using
 * the OAuth2 Authorization Code PKCE flow.
 *
 * The random state is saved in sessionStorage with the key 'authState'.
 * The PKCE code verifier is saved in sessionStorage with the key 'authVerifier'.
 *
 * @param {Object} opts Options for the authorization procedure.
 * @param {string} opts.scope OAuth2 scope to request.
 *
 * @returns {string} Authorization url where the user should be redirected.
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
	sessionStorage.setItem('authState', state);
	sessionStorage.setItem('authVerifier', verifier);

	return OAUTH2.url + '/authorize?' + objectToParams(reqOpts);
}

/**
 * Completes the OAuth2 autorization code PKCE flow.
 *
 * The access token is saved into localStorage with the key 'authToken' as a stringified JSON.
 *
 * @param {string} code Authorization code.
 * @param {string} state State to be checked with the saved one.
 * @returns {Promise}
 */
export function token(code, state) {
	const storedState = sessionStorage.getItem('authState');
	const verifier = sessionStorage.getItem('authVerifier');
	sessionStorage.removeItem('authState');
	sessionStorage.removeItem('authVerifier');

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

	// Save into localStorage
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
			return JSON.stringify(data);
		})
		.then(data => {
			localStorage.setItem('authToken', data);
			navUpdater();
		});
}

/**
 * Returns the JWT from localStorage.
 *
 * @returns {string} JWT token.
 */
export function getTokenString() {
	const tok = JSON.parse(localStorage.getItem('authToken'));

	if (tok) {
		return tok.access_token;
	}
	return '';
}
