import { h } from 'preact';
import { Container, Header } from 'semantic-ui-react';
import Helmet from 'preact-helmet';
import { PageNeedsScope } from '../../../components/has-scope';
import { PageCreator } from '../../../components/page-creator';

export default function PageCreate() {
	return (
		<Container>
			<PageNeedsScope scope="xmc.core/manage/page">
				<Helmet title="New page"/>
				<Header as="h1">New page</Header>
				<PageCreator/>
			</PageNeedsScope>
		</Container>
	);
}
