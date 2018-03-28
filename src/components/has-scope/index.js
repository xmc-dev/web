import jwtDecode from 'jwt-decode';
import { connect } from 'preact-redux';
import { withRouter } from 'react-router-dom';

function ConnectedHasScope({ scope, token, children }) {
	if (!token.access_token) {
		return null;
	}
	let decoded;
	try {
		decoded = jwtDecode(token.access_token);
	} catch (err) {
		return null;
	}
	const r = new RegExp(scope.replace(/\./, '\\.'));
	if (r.test(decoded.role.scope)) {
		return <div>{children}</div>;
	}

	return null;
}

export const HasScope = withRouter(
	connect(state => ({
		token: state.auth.token
	}))(ConnectedHasScope)
);
