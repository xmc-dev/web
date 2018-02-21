import { API_URL } from '../../config';

/**
 * Makes an API call.
 * @param {string} endpoint The api endpoint with its parameters
 * @param {object} options fetch() options
 * @returns {Promise} Returned promise from fetch()
 */
export function rawApi(endpoint, options) {
    console.log('fetching from', API_URL+endpoint);

    const opts = options || {};
    opts.headers = new Headers();
    opts.headers.append('Origin', window.location.origin);
    return fetch(API_URL + endpoint, opts);
}

/**
 * Makes an API call and returns a promise with the de-JSON'd response object.
 * @param {string} endpoint
 * @param {object} options
 * @returns {Promise} Returned promise from fetch() that has a de-JSON'd response object as its first parameter.
 */
export function api(endpoint, options) {
    return rawApi(endpoint, arguments)
    .then(response => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response.json();
    });
}