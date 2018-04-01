import { getTask } from '../../lib/api/task';

export const READ_TASK_REQUEST = 'READ_TASK_REQUEST';
export const READ_TASK_SUCCESS = 'READ_TASK_SUCCESS';
export const READ_TASK_FAILURE = 'READ_SUBMISSION_FAILURE';

export const readTaskRequest = id => ({
	type: READ_TASK_REQUEST,
	id
});
export const readTaskSuccess = (id, task) => ({
	type: READ_TASK_SUCCESS,
	id,
	task
});
export const readTaskFailure = (id, error) => ({
	type: READ_TASK_FAILURE,
	id,
	error
});

export function readTask(id) {
	return dispatch => {
		dispatch(readTaskRequest(id));
		return getTask(id)
			.then(task => dispatch(readTaskSuccess(id, task)))
			.catch(error => dispatch(readTaskFailure(id, error)));
	};
}

function shouldReadTask(state, id) {
	const task = state.tasks.byId[id];
	return !task;
}

export function readTaskIfNeeded(id) {
	return (dispatch, getState) => {
		if (shouldReadTask(getState(), id)) {
			return dispatch(readTask(id));
		}
		return Promise.resolve();
	};
}
