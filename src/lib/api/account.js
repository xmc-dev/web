import { api } from '.';

function processAccount(raw) {
	return Object.assign({}, raw, {
		createdAt: new Date(raw.createdAt * 1000),
		updatedAt: new Date(raw.updatedAt * 1000)
	});
}

export function getAccount(id, options) {
	const i = id || '';
	return api('/accounts/' + i, options).then(raw => processAccount(raw));
}
