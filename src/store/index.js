import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import popupReducer from '../reducers/popup';
import { showPopup, showPopupWithTimeout } from '../actions/popup';

const store = createStore(
	combineReducers({ popup: popupReducer }),
	applyMiddleware(thunk)
);

export default store;
