import { h } from 'preact';
import { Container, Header } from 'semantic-ui-react';

/**
 *
 * @param {object} props
 * @param {string} props.error Error message to be displayed.
 */
export function ErrorMessage({ error, detail }) {
	return (
		<Container>
			<Header as="h1">Error: {error}</Header>
			<Header as="h2">{detail}</Header>
		</Container>
	);
}
