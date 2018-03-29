import { api } from '.';

function processTask(raw) {
	return Object.assign({}, raw, {});
}

export function getTask(id, options) {
	return api('/tasks/' + id, options).then(raw => processTask(raw.task));
}

export function getTasks(options) {
	return api('/tasks/', options).then(raws => raws.tasks.map(processTask));
}
