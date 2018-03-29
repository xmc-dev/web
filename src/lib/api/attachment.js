import { api, rawCall, rfc3339ToDate } from '../api';
import { FILES_PROXY } from '../../config';

function processAttachment(raw) {
	const dates = {
		createdAt: rfc3339ToDate(raw.createdAt),
		updatedAt: rfc3339ToDate(raw.updatedAt)
	};
	return Object.assign({}, raw, dates);
}

/**
 * Get attachment metadata
 * @param {string} attachmentId
 * @param {object} options
 * @returns {Promise<object>}
 */
export function getAttachment(attachmentId, options) {
	return api('/attachments/' + attachmentId, options).then(raw =>
		processAttachment(raw.attachment)
	);
}

/**
 * Get the URL of an attachment on the storage server.
 * @param {string} attachmentId The attachment id.
 * @param {object} options Options to pass to fetch().
 */
export function getAttachmentUrl(attachmentId, options) {
	return api('/attachments/' + attachmentId + '/file', options).then(data => {
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
 * @param {string} attachmentId The attachment id.
 * @param {Object} options Options to pass to fetch().
 * @returns {Promise<DownloadedAttachment>}
 */
export function getAttachmentContent(attachmentId, options) {
	return getAttachmentUrl(attachmentId, options).then(url => {
		const parser = document.createElement('a');
		parser.href = url;
		const newUrl = url.replace(new RegExp('^' + parser.origin), FILES_PROXY);
		return rawCall(newUrl, options)
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
