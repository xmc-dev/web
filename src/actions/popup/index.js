export const SHOW_POPUP = 'SHOW_POPUP';
export const HIDE_POPUP = 'HIDE_POPUP';

/**
 * @typedef {Object} Popup
 * @property {string} title
 * @property {string} body
 * @property {string} state
 */

/**
 * Pushes the popup on the stack.
 * @param {Number} id
 * @param {Popup} popup
 */
export const showPopup = (id, popup) => ({ type: SHOW_POPUP, id, popup });

/**
 * Removes the popup from the stack.
 * @param {Number} id
 */
export const hidePopup = id => ({ type: HIDE_POPUP, id });

let nextPopupId = 0;

/**
 * Pushes a popup on the stack and removes it after time millis.
 * @param {Popup} popup
 * @param {Number} time Time in milliseconds.
 */
export function showPopupWithTimeout(popup, time = 5000) {
	return dispatch => {
		const id = nextPopupId++;
		dispatch(showPopup(id, popup));

		setTimeout(() => {
			dispatch(hidePopup(id));
		}, time);
	};
}
