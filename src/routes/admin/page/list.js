import { h } from 'preact';
import { Container, Header } from 'semantic-ui-react';
import { PageNeedsScope } from '../../../components/has-scope';
import Helmet from 'preact-helmet';
import { PageList as CPageList } from '../../../components/page-list';

export default function PageList() {
	return (
		<Container>
			<PageNeedsScope scope="xmc.core/manage/page">
				<Helmet title="Admin - Pages"/>
				<CPageList/>
			</PageNeedsScope>
		</Container>
	);
}
