import { objectToParams } from "../query-params";
import { api, rfc3339ToDate } from '.';

function processVersion(raw) {
	return Object.assign({}, raw, {
		timestamp: rfc3339ToDate(raw.timestamp)
	});
}

function processPage(raw) {
	return Object.assign({}, raw, {
		latestTimestamp: rfc3339ToDate(raw.latestTimestamp),
		version: processVersion(raw.version)
	});
}

export function getPage(id, {timestamp} = {}, options) {
	if (id === '/') {
		id = '<root>';
	}

	const params = {};
	if (timestamp) {
		params.timestamp = timestamp.toISOString();
	}
	return api('/pages/'+id+'?'+objectToParams(params), options)
	.then(raw => processPage(raw.page));
}