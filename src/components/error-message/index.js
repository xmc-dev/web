import { h } from 'preact';
import { Message } from 'semantic-ui-react';

/**
 *
 * @param {object} props
 * @param {string} props.error Error message to be displayed.
 */
export function ErrorMessage({ error, detail }) {
	console.error(error, detail);
	return (
		<Message negative>
			<Message.Header>Error: {error}</Message.Header>
			<p>{detail}</p>
		</Message>
	);
}
