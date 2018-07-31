import { h } from 'preact';
import { PageNeedsScope } from '../../../components/has-scope';
import Helmet from 'preact-helmet';
import { PageList as CPageList } from '../../../components/page-list';

export default function PageList(props) {
	return (
		<main>
			<PageNeedsScope scope="xmc.core/manage/page">
				<Helmet title="Admin - Pages"/>
				<CPageList id={props.match.params.id || '/'}/>
			</PageNeedsScope>
		</main>
	);
}
