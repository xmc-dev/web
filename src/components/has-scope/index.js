import { h } from 'preact';
import { connect } from 'preact-redux';
import { withRouter } from 'react-router-dom';
import { ForbiddenPage } from '../error-message';

/**
 * Renders children if the user has the required scopes. If not, renders fail.
 * @param {*} params
 */
function ConnectedHasScope({ scope, fail = null, decodedJWT, children }) {
	if (!decodedJWT) {
		return fail;
	}

	if (decodedJWT.role.scope !== '*') {
		const ownedScopes = decodedJWT.role.scope.split(' ');
		for (const s of scope.split(' ')) {
			const decomposed = s.split('/');
			let i = 0;
			let comp = decomposed[0];
			while (i < decomposed.length && ownedScopes.indexOf(comp) === -1) {
				i++;
				comp = [comp, decomposed[i]].join('/');
			}
			if (i === decomposed.length) {
				return fail;
			}
		}
	}

	if (children.length === 1) {
		return children[0];
	}
	return <div>{children}</div>;
}

export const HasScope = withRouter(
	connect(state => ({
		decodedJWT: state.auth.decodedJWT
	}))(ConnectedHasScope)
);

export function PageNeedsScope({ scope, children }) {
	return (
		<HasScope scope={scope} fail={<ForbiddenPage/>}>
			{children}
		</HasScope>
	);
}
