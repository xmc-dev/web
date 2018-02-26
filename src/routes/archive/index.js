import { h, Component } from 'preact';
import Helmet from 'preact-helmet';
import { Container, Header } from 'semantic-ui-react';
import { TaskList } from '../../components/task-list';

export default class Archive extends Component {
	render() {
		return (
			<Container>
				<Helmet title="Arhiva de probleme" />
				<Header as="h1">Arhiva de probleme</Header>
				<TaskList />
			</Container>
		);
	}
}
