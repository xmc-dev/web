import { objectToParams } from '../query-params';
import { api, rfc3339ToDate } from '.';

function processVersion(raw) {
	return Object.assign({}, raw, {
		timestamp: rfc3339ToDate(raw.timestamp)
	});
}

function processPage(raw) {
	return Object.assign({}, raw, {
		latestTimestamp: rfc3339ToDate(raw.latestTimestamp),
		version: raw.version ? processVersion(raw.version) : undefined
	});
}

export function getPage(id, { timestamp, raw } = {}, options) {
	if (id === '/') {
		id = '<root>';
	}

	const params = {};
	if (timestamp) {
		params.timestamp = timestamp.toISOString();
	}
	if (raw) {
		params.raw = 'true';
	}
	return api('/pages/' + id + '?' + objectToParams(params), options).then(raw =>
		processPage(raw.page)
	);
}

export function getFirstChildren(id, params = {}, options) {
	return api(
		'/pagechildren/' + id + '?' + objectToParams(params),
		options
	).then(raws => raws.pages.map(processPage));
}

export function createPage(pageMeta, title, contents, options) {
	return api('/pages/', {
		method: 'POST',
		body: JSON.stringify({
			page: pageMeta,
			title,
			contents
		}),
		...options
	}).then(rsp => rsp.id);
}

export function updatePage(id, update, options) {
	return api('/pages/' + id, {
		method: 'PATCH',
		body: JSON.stringify(update),
		...options
	});
}
