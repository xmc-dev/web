import { getPage, updatePage as aUpdatePage } from '../../lib/api/page';
import { getAttachmentContent } from '../../lib/api/attachment';

export const READ_PAGE_REQUEST = 'READ_PAGE_REQUEST';
export const READ_PAGE_SUCCESS = 'READ_PAGE_SUCCESS';
export const READ_PAGE_FAILURE = 'READ_PAGE_FAILURE';

export const UPDATE_PAGE_REQUEST = 'UPDATE_PAGE_REQUEST';
export const UPDATE_PAGE_SUCCESS = 'UPDATE_PAGE_SUCCESS';
export const UPDATE_PAGE_FAILURE = 'UPDATE_PAGE_FAILURE';

export const READ_CONTENT_REQUEST = 'READ_CONTENT_REQUEST';
export const READ_CONTENT_SUCCESS = 'READ_CONTENT_SUCCESS';
export const READ_CONTENT_FAILURE = 'READ_CONTENT_FAILURE';

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

export const readContentRequest = (id, attId, timestamp = '') => ({
	type: READ_CONTENT_REQUEST,
	attId,
	id: id + timestamp
});

export const readContentSuccess = (id, content, timestamp = '') => ({
	type: READ_CONTENT_SUCCESS,
	id: id + timestamp,
	content
});

export const readContentFailure = (id, error, timestamp = '') => ({
	type: READ_CONTENT_FAILURE,
	id: id + timestamp,
	error
});

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

export function readContent(id, timestamp = '') {
	return (dispatch, getState) => {
		const attId = getState().pages.byId[id + timestamp].version.attachmentId;
		dispatch(readContentRequest(id, attId, timestamp));
		return getAttachmentContent(attId)
			.then(att => dispatch(readContentSuccess(id, att.data, timestamp)))
			.catch(error => dispatch(readContentFailure(id, error, timestamp)));
	};
}

function shouldReadContent(state, id, timestamp) {
	const attId = state.pages.byId[id + timestamp].version.attachmentId;
	const content = state.pages.contents[id + timestamp];
	return !content || content.attId !== attId;
}

export function readContentIfNeeded(id, timestamp = '') {
	return (dispatch, getState) => {
		if (shouldReadContent(getState(), id, timestamp)) {
			return dispatch(readContent(id, timestamp));
		}
		return Promise.resolve();
	};
}
