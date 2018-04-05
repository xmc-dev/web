import { h } from 'preact';
import { Container, Header } from 'semantic-ui-react';
import { PageNeedsScope } from '../../../components/has-scope';
import Helmet from 'preact-helmet';

export default function PageList() {
	return (
		<Container>
			<PageNeedsScope scope="xmc.core/manage/page">
				<Helmet title="Admin - Pages"/>
				<Header as="h1">Work in progress...</Header>
			</PageNeedsScope>
		</Container>
	);
}
