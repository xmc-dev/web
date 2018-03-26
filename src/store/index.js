import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import popupReducer from '../reducers/popup';
import authReducer from '../reducers/auth';
import { showPopup, showPopupWithTimeout } from '../actions/popup';

function cleanOldState(state) {
	return { ...state, popup: { popups: [] } };
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const savedState = localStorage.getItem('reduxState') ?
	JSON.parse(localStorage.getItem('reduxState')) :
	{};
const store = createStore(
	combineReducers({
		popup: popupReducer,
		auth: authReducer
	}),
	cleanOldState(savedState),
	composeEnhancers(applyMiddleware(thunk))
);
store.subscribe(() => {
	localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

export default store;
