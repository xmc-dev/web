import { API_URL } from '../../config';
import { getTokenString } from '../auth';
import { statuses } from './statuses';

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

/**
 * Makes an API call.
 * @param {string} endpoint The api endpoint with its parameters
 * @param {object} options fetch() options
 * @returns {Promise} Returned promise from fetch()
 */
export function rawApi(endpoint, options) {
	const tok = getTokenString();
	const opts = options || {};
	opts.headers = opts.headers || new Headers();
	if (tok) {
		opts.headers.append('Authorization', 'Bearer ' + tok);
	}

	return rawCall(API_URL + endpoint, opts);
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
			if (!response.statusText) {
				response.statusText = statuses[response.status];
			}
			throw new Error(response.statusText);
		}
		return response.json();
	});
}
