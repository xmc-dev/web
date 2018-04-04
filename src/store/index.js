import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import popupReducer from '../reducers/popup';
import authReducer from '../reducers/auth';
import submissionsReducer from '../reducers/submissions';
import tasksReducer from '../reducers/tasks';
import pagesReducer from '../reducers/pages';

function cleanOldState(state) {
	return {
		...state,
		popup: { popups: [] },
		submissions: {},
		tasks: {},
		pages: {}
	};
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const savedState = localStorage.getItem('reduxState') ?
	JSON.parse(localStorage.getItem('reduxState')) :
	{};
const store = createStore(
	combineReducers({
		popup: popupReducer,
		auth: authReducer,
		submissions: submissionsReducer,
		tasks: tasksReducer,
		pages: pagesReducer
	}),
	cleanOldState(savedState),
	composeEnhancers(applyMiddleware(thunk))
);
store.subscribe(() => {
	console.log(store.getState());
	localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

export default store;
