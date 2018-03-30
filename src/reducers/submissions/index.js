import {
	READ_SUBMISSION_REQUEST,
	READ_SUBMISSION_SUCCESS,
	READ_SUBMISSION_FAILURE
} from '../../actions/submissions';
import { combineReducers } from 'redux';

const initialState = {
	byId: {}
};

function submissionsByIdReducer(state = initialState.byId, action) {
	switch (action.type) {
		case READ_SUBMISSION_REQUEST:
			return { ...state, [action.id]: { isFetching: true, error: null } };
		case READ_SUBMISSION_SUCCESS:
			return {
				...state,
				[action.id]: { isFetching: false, error: null, ...action.submission }
			};
		case READ_SUBMISSION_FAILURE:
			return {
				...state,
				[action.id]: { isFetching: false, error: action.error }
			};
		default:
			return state;
	}
}

const submissionsReducer = combineReducers({
	byId: submissionsByIdReducer
});
export default submissionsReducer;
