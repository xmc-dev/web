import { api } from '.';

function processDataset(raw) {
	return Object.assign({}, raw);
}

export function getDataset(id, options) {
	return api('/datasets/' + id, options).then(raw =>
		processDataset(raw.dataset)
	);
}
