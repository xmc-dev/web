import { h } from 'preact';
import { Text } from 'preact-i18n';
import { Title } from '../../../components/title';
import { Header } from '../../../components/page/components/header';
import { PageNeedsScope } from '../../../components/has-scope';
import { PageCreator } from '../../../components/page-creator';

export default function PageCreate() {
	return (
		<main>
			<PageNeedsScope scope="xmc.core/manage/page">
				<Title id="admin.pages.new-page"/>
				<Header title={<Text id="admin.pages.new-page"/>}/>
				<PageCreator/>
			</PageNeedsScope>
		</main>
	);
}
