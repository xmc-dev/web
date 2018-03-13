import { SHOW_POPUP, HIDE_POPUP } from '../../actions/popup';

const initialState = {
	popups: []
};

export default function popupReducer(state = initialState, action) {
	switch (action.type) {
		case SHOW_POPUP:
			return {
				...state,
				popups: [...state.popups, { id: action.id, popup: action.popup }]
			};
		case HIDE_POPUP:
			const index = state.popups.findIndex(el => el.id == action.id);
			if (index == -1) {
				return state;
			}

			return {
				...state,
				popups: [
					...state.popups.slice(0, index),
					...state.popups.slice(index + 1)
				]
			};
		default:
			return state;
	}
}
