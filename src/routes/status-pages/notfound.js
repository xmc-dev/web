import { h } from 'preact';
import { Container, Header } from 'semantic-ui-react/dist/commonjs';

export default function NotFound() {
	return (
		<Container>
			<Header as="h1">Nothing here</Header>
			<p>You got lost, that shouldn&apos;t happen.</p>
		</Container>
	);
}
