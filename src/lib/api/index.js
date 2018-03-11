import { API_URL, FILES_PROXY } from '../../config';
import { getTokenString } from '../auth';

export function rawCall(url, options) {
	console.log('fetching from', url);

	const opts = options || {};
	opts.headers = opts.headers || new Headers();
	console.log(opts.headers);
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
			throw new Error(response.statusText);
		}
		return response.json();
	});
}

/**
 * Get the URL of an attachment on the storage server.
 * @param {string} attachmentId The attachment id.
 * @param {object} options Options to pass to fetch().
 */
export function getAttachmentUrl(attachmentId, options) {
	return api('/attachments/' + attachmentId + '/file').then(data => {
		return data.url;
	});
}

/**
 * @typedef {Object} DownloadedAttachment
 * @property {string} url The url on the storage server.
 * @property {string} data The actual contents.
 */

/**
 * Download an attachment by its id.
 * @param {*} attachmentId The attachment id.
 * @param {*} options Options to pass to fetch().
 * @returns {Promise<DownloadedAttachment>}
 */
export function getAttachmentContent(attachmentId, options) {
	return getAttachmentUrl(attachmentId, options).then(url => {
		const parser = document.createElement('a');
		parser.href = url;
		const newUrl = url.replace(new RegExp("^"+parser.origin), FILES_PROXY);
		return rawCall(newUrl)
			.then(data => {
				if (!data.ok) {
					throw new Error(data.statusText);
				}
				return data.text();
			})
			.then(textData => {
				return { url: newUrl, data: textData };
			});
	});
}
