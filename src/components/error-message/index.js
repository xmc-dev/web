import { h } from 'preact';
import { Message } from 'semantic-ui-react';

/**
 *
 * @param {object} props
 * @param {string} props.error Error message to be displayed.
 * @param {string} props.detail
 */
export function ErrorMessage({ error, detail }) {
	detail = detail.charAt(0).toUpperCase() + detail.substr(1);
	console.error(error, detail);
	return (
		<Message negative>
			<Message.Header>Error: {error}</Message.Header>
			<p>{detail}</p>
		</Message>
	);
}
