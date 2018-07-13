import {
	READ_PAGE_REQUEST,
	READ_PAGE_SUCCESS,
	READ_PAGE_FAILURE,
	UPDATE_PAGE_REQUEST,
	UPDATE_PAGE_SUCCESS,
	UPDATE_PAGE_FAILURE
} from '../../actions/pages';
import { combineReducers } from 'redux';

const initialState = {
	byId: {},
	ids: {},
	updates: {}
};

function pagesByIdReducer(state = initialState.byId, action) {
	switch (action.type) {
		case READ_PAGE_REQUEST:
			return { ...state, [action.id]: { isFetching: true, error: null } };
		case READ_PAGE_SUCCESS:
			return {
				...state,
				[action.page.id]: { isFetching: false, error: null, ...action.page }
			};
		case READ_PAGE_FAILURE:
			return {
				...state,
				[action.id]: { isFetching: false, error: action.error }
			};
		default:
			return state;
	}
}

function pageIdsReducer(state = initialState.ids, action) {
	switch (action.type) {
		case READ_PAGE_REQUEST:
			return { ...state, [action.id]: action.id };
		case READ_PAGE_SUCCESS:
			return { ...state, [action.id]: action.page.id };
		case READ_PAGE_FAILURE:
		default:
			return state;
	}
}

function updatesReducer(state = initialState.updates, action) {
	switch (action.type) {
		case UPDATE_PAGE_REQUEST:
			return { ...state, [action.id]: { isFetching: true, error: null } };
		case UPDATE_PAGE_SUCCESS:
			return {
				...state,
				[action.id]: {
					isFetching: false,
					error: null,
					successTime: action.successTime
				}
			};
		case UPDATE_PAGE_FAILURE:
			return {
				...state,
				[action.id]: { isFetching: false, error: action.error }
			};
		default:
			return state;
	}
}

const pagesReducer = combineReducers({
	byId: pagesByIdReducer,
	ids: pageIdsReducer,
	updates: updatesReducer
});
export default pagesReducer;
