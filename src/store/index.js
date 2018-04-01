import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import popupReducer from '../reducers/popup';
import authReducer from '../reducers/auth';
import submissionsReducer from '../reducers/submissions';
import tasksReducer from '../reducers/tasks';
import { readTaskIfNeeded } from '../actions/tasks';

function cleanOldState(state) {
	return { ...state, popup: { popups: [] }, submissions: {}, tasks: {} };
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
		tasks: tasksReducer
	}),
	cleanOldState(savedState),
	composeEnhancers(applyMiddleware(thunk))
);
store.subscribe(() => {
	localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});
window.t = () =>
	store.dispatch(readTaskIfNeeded('13ce7890-fed2-11e7-9b2b-bb72d51788e7'));

export default store;
