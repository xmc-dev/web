import { h } from 'preact';
import { OAUTH2 } from '../../config';
import { Redirect } from 'react-router-dom';
import { connect } from 'preact-redux';
import { withText } from 'preact-i18n';
import { showPopupWithTimeout } from '../../actions/popup';
import { logout } from '../../actions/auth';
import { getTokenString } from '../../lib/auth';

function ConnectedLogout({ doLogout, showMessage }) {
	const tok = getTokenString();
	if (!tok) {
		showMessage();
		return <Redirect to="/"/>;
	}

	doLogout();
	window.location.replace(
		OAUTH2.url +
			'/logout?redirect_uri=' +
			encodeURIComponent(window.location.origin + '/logout')
	);
	return null;
}

const Logout = withText({ popupTitle: 'logout.popup.title' })(
	connect(
		() => ({}),
		(dispatch, props) => ({
			doLogout: () => dispatch(logout()),
			showMessage: () =>
				dispatch(
					showPopupWithTimeout({
						title: props.popupTitle,
						state: 'success'
					})
				)
		})
	)(ConnectedLogout)
);
export default Logout;
