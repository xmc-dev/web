import { h } from 'preact';
import { Container } from 'semantic-ui-react';
import { Text } from 'preact-i18n';
import { TaskListList } from '../../components/tasklist-list';
import { Title } from '../../components/title';
import { Header } from '../../components/page/components/header';

export default function Rounds(/* { match } */) {
	return (
		<main>
			<Title id="rounds.title"/>
			<Header title={<Text id="rounds.title"/>}/>
			<Container>
				<TaskListList/>
			</Container>
		</main>
	);
}
