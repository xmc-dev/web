import { h } from 'preact';
import { Message } from 'semantic-ui-react';
import Helmet from 'preact-helmet';

/**
 *
 * @param {object} props
 * @param {string} props.error Error message to be displayed.
 * @param {string} props.detail
 */
export function ErrorMessage({ error, detail }) {
	if (detail) {
		detail = detail.charAt(0).toUpperCase() + detail.substr(1);
	}
	console.error(error, detail);
	return (
		<Message negative>
			<Message.Header>Error: {error}</Message.Header>
			<pre>
				<p>{detail}</p>
			</pre>
		</Message>
	);
}

export function ForbiddenPage() {
	return (
		<div>
			<Helmet title="Forbidden"/>
			<ErrorMessage
				error="Forbidden"
				detail="You are not allowed to see this page."
			/>
		</div>
	);
}
