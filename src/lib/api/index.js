import { API_URL } from '../../config';

/**
 * Makes an API call.
 * @param {string} endpoint The api endpoint with its parameters
 * @param {object} options fetch() options
 * @returns {Promise} fetch() Promise with de-JSON'd response object and optional thrown error if any.
 */
export function api(endpoint, options) {
    console.log('fetching from', API_URL+endpoint);
    return fetch(API_URL+endpoint, options)
    .then(response => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response.json();
    });
}