import { h } from 'preact';
import { Container } from 'semantic-ui-react';
import { PageNeedsScope } from '../../../components/has-scope';
import Helmet from 'preact-helmet';
import { PageList as CPageList } from '../../../components/page-list';

export default function PageList(props) {
	return (
		<Container>
			<PageNeedsScope scope="xmc.core/manage/page">
				<Helmet title="Admin - Pages"/>
				<CPageList id={props.match.params.id || '/'}/>
			</PageNeedsScope>
		</Container>
	);
}
