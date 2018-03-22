import { rfc3339ToDate, api } from ".";

function processTask(raw) {
	return Object.assign({}, raw, {});
}

export function getTask(id, options) {
	return api('/tasks/' + id).then(raw => processTask(raw.task));
}

export function getTasks(options) {
	return api('/tasks/').then(raws => raws.tasks.map(processTask));
}