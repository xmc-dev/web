import { h } from 'preact';
import { Container } from 'semantic-ui-react';
import Helmet from 'preact-helmet';
import { TaskListList } from '../../components/tasklist-list';

export default function Rounds({ match }) {
	return (
		<Container>
			<Helmet title="Runde"/>
			<TaskListList/>
		</Container>
	);
}
