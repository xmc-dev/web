import { api, rfc3339ToDate } from '.';
import { objectToParams } from '../query-params';

function dateOrNull(d) {
	if (d === null) {
		return null;
	}
	return rfc3339ToDate(d);
}

function processTaskList(raw) {
	return Object.assign({}, raw, {
		timeRange: {
			begin: dateOrNull(raw.timeRange.begin),
			end: dateOrNull(raw.timeRange.end)
		}
	});
}

export function getTaskListUrl(tl) {
	return '/' + tl.name;
}

export function getTaskList(id, options) {
	return api('/tasklists/' + id, options).then(raw =>
		processTaskList(raw.taskList)
	);
}

export function getTaskLists(params = { offset: 0 }, options) {
	return api('/tasklists/?' + objectToParams(params), options).then(raws => ({
		meta: raws.meta,
		taskLists: raws.taskLists.map(processTaskList)
	}));
}
