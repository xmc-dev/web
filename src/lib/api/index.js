import { API_URL } from '../../config';
import { getTokenString, getDecodedJWT, doRefresh } from '../auth';
import { statuses } from './statuses';
import Mutex from 'promise-mutex';

export class APIError extends Error {
	constructor(message, body) {
		super(message);
		this.body = body;
	}
}

// One minute
const expirationTolerance = 60;

function checkToken(tok) {
	return (
		Math.floor(new Date().getTime() / 1000) < tok.exp - expirationTolerance
	);
}

export function rfc3339ToDate(date) {
	const d = new Date(date);
	if (isNaN(d.getTime())) {
		return null;
	}
	return d;
}

export function rawCall(url, options) {
	console.log('fetching from', url);

	const opts = options || {};
	opts.headers = opts.headers || new Headers();
	opts.headers.append('Origin', window.location.origin);
	return fetch(url, opts);
}

// XXX: This hack is so ugly it deserves its own eslint warning, hence the XXX.
// So when the token needs to be refreshed, it is refreshed in a promise that
// after the token is refreshed successfully, it does the actual api call.
// Problem is that other components might also make api calls and we end up with a race condition.
// I think that there are two solutions: either move all api calls to redux, or put a mutex.
// And here is the mutex, ba dum tss.
const refreshMutex = new Mutex();

/**
 * Makes an API call.
 * @param {string} endpoint The api endpoint with its parameters
 * @param {object} options fetch() options
 * @returns {Promise} Returned promise from fetch()
 */
export function rawApi(endpoint, options) {
	const tok = getTokenString();
	const opts = options || {};
	let p = () => Promise.resolve();
	opts.headers = opts.headers || new Headers();
	if (tok) {
		if (!checkToken(getDecodedJWT())) {
			p = () => refreshMutex.lock(() => doRefresh());
		}
		opts.headers.append('Authorization', 'Bearer ' + tok);
	}
	return p().then(() => rawCall(API_URL + endpoint, opts));
}

/**
 * Makes an API call and returns a promise with the de-JSON'd response object.
 * @param {string} endpoint
 * @param {object} options
 * @returns {Promise} Returned promise from fetch() that has a de-JSON'd response object as its first parameter.
 */
export function api(endpoint, options) {
	return rawApi(endpoint, options).then(response => {
		if (!response.ok) {
			let s = response.statusText;
			if (!s) {
				s = statuses[response.status];
			}
			return Promise.all([s, response.json()]).then(val => {
				throw new APIError(val[0], val[1]);
			});
		}
		return response.json();
	});
}
