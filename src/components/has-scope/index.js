import { h } from 'preact';
import jwtDecode from 'jwt-decode';
import { connect } from 'preact-redux';
import { withRouter } from 'react-router-dom';

function ConnectedHasScope({ scope, fail = null, token, children }) {
	if (!token.access_token) {
		return fail;
	}
	let decoded;
	try {
		decoded = jwtDecode(token.access_token);
	} catch (err) {
		return fail;
	}

	for (const s of scope.split(' ')) {
		// Escape dots and add word boundaries
		const r = new RegExp('\\b' + s.replace(/\./, '\\.') + '\\b');
		if (!r.test(decoded.role.scope)) {
			return fail;
		}
	}

	return <div>{children}</div>;
}

export const HasScope = withRouter(
	connect(state => ({
		token: state.auth.token
	}))(ConnectedHasScope)
);
