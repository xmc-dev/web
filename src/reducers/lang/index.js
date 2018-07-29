import { CHANGE_LANG } from '../../actions/lang';

const initialState = {
	id: 'en'
};

export default function langReducer(state = initialState, action) {
	switch (action.type) {
		case CHANGE_LANG:
			return {
				...state,
				id: action.id
			};
		default:
			return state;
	}
}
