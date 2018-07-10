import { api } from '.';

function processAcc(raw) {
	return Object.assign({}, raw, {
		createdAt: new Date(raw.createdAt * 1000),
		updatedAt: new Date(raw.updatedAt * 1000)
	});
}

function processRole(raw) {
	return { ...raw };
}

function processAccount(raw) {
	return { account: processAcc(raw.account), role: processRole(raw.role) };
}

export function getAccount(id, options) {
	const i = id || 'me';
	return api('/accounts/' + i, options).then(raw => processAccount(raw));
}
