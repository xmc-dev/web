import {
	READ_TASK_REQUEST,
	READ_TASK_SUCCESS,
	READ_TASK_FAILURE
} from '../../actions/tasks';
import { combineReducers } from 'redux';

const initialState = {
	byId: {}
};

function tasksByIdReducer(state = initialState.byId, action) {
	switch (action.type) {
		case READ_TASK_REQUEST:
			return { ...state, [action.id]: { isFetching: true, error: null } };
		case READ_TASK_SUCCESS:
			return {
				...state,
				[action.id]: { isFetching: false, error: null, ...action.task }
			};
		case READ_TASK_FAILURE:
			return {
				...state,
				[action.id]: { isFetching: false, error: action.error }
			};
		default:
			return state;
	}
}

const tasksReducer = combineReducers({
	byId: tasksByIdReducer
});
export default tasksReducer;
