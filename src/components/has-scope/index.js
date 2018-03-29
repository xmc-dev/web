import { h } from 'preact';
import { connect } from 'preact-redux';
import { withRouter } from 'react-router-dom';

function ConnectedHasScope({ scope, fail = null, decodedJWT, children }) {
	if (!decodedJWT) {
		return fail;
	}

	for (const s of scope.split(' ')) {
		// Escape dots and add word boundaries
		const r = new RegExp('\\b' + s.replace(/\./, '\\.') + '\\b');
		if (!r.test(decodedJWT.role.scope)) {
			return fail;
		}
	}

	return <div>{children}</div>;
}

export const HasScope = withRouter(
	connect(state => ({
		decodedJWT: state.auth.decodedJWT
	}))(ConnectedHasScope)
);
