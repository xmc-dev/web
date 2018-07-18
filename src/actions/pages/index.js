import {
	createPage as aCreatePage,
	getPage,
	updatePage as aUpdatePage
} from '../../lib/api/page';

export const CREATE_PAGE_REQUEST = 'CREATE_PAGE_REQUEST';
export const CREATE_PAGE_SUCCESS = 'CREATE_PAGE_SUCCESS';
export const CREATE_PAGE_FAILURE = 'CREATE_PAGE_FAILURE';

export const READ_PAGE_REQUEST = 'READ_PAGE_REQUEST';
export const READ_PAGE_SUCCESS = 'READ_PAGE_SUCCESS';
export const READ_PAGE_FAILURE = 'READ_PAGE_FAILURE';

export const UPDATE_PAGE_REQUEST = 'UPDATE_PAGE_REQUEST';
export const UPDATE_PAGE_SUCCESS = 'UPDATE_PAGE_SUCCESS';
export const UPDATE_PAGE_FAILURE = 'UPDATE_PAGE_FAILURE';

export const createPageRequest = (page, title, contents) => ({
	type: CREATE_PAGE_REQUEST,
	page,
	title,
	contents
});

export const createPageSuccess = (id, path) => ({
	type: CREATE_PAGE_SUCCESS,
	id,
	path
});

export const createPageFailure = (path, error) => ({
	type: CREATE_PAGE_FAILURE,
	path,
	error
});

export const readPageRequest = (id, timestamp = '') => ({
	type: READ_PAGE_REQUEST,
	id: id + timestamp
});

export const readPageSuccess = (id, page, timestamp = '') => ({
	type: READ_PAGE_SUCCESS,
	id: id + timestamp,
	page
});

export const readPageFailure = (id, error, timestamp = '') => ({
	type: READ_PAGE_FAILURE,
	id: id + timestamp,
	error
});

export const updatePageRequest = id => ({
	type: UPDATE_PAGE_REQUEST,
	id
});

export const updatePageSuccess = id => ({
	type: UPDATE_PAGE_SUCCESS,
	successTime: new Date(),
	id
});

export const updatePageFailure = (id, error) => ({
	type: UPDATE_PAGE_FAILURE,
	id,
	error
});

export function createPage(page, title, contents) {
	return dispatch => {
		dispatch(createPageRequest(page));
		return aCreatePage(page, title, contents)
			.then(id => dispatch(createPageSuccess(id, page.path)))
			.catch(error => dispatch(createPageFailure(page.path, error)));
	};
}

export function readPage(id, timestamp = '') {
	return dispatch => {
		dispatch(readPageRequest(id, timestamp));
		return getPage(id, { timestamp })
			.then(page => dispatch(readPageSuccess(id, page, timestamp)))
			.catch(error => dispatch(readPageFailure(id, error, timestamp)));
	};
}

function shouldReadPage(state, id, timestamp) {
	const page = state.pages.byId[id + timestamp];
	return !page;
}

export function readPageIfNeeded(id, timestamp = '') {
	return (dispatch, getState) => {
		if (shouldReadPage(getState(), id, timestamp)) {
			return dispatch(readPage(id, timestamp));
		}
		return Promise.resolve();
	};
}

export function updatePage(id, update) {
	return dispatch => {
		dispatch(updatePageRequest(id));
		return aUpdatePage(id, update)
			.then(() => {
				dispatch(updatePageSuccess(id));
				dispatch(readPage(id));
			})
			.catch(error => dispatch(updatePageFailure(id, error)));
	};
}
