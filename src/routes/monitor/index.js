import { h, Component } from 'preact';
import Helmet from 'preact-helmet';
import { Container, Header } from 'semantic-ui-react';
import { SubmissionMonitor } from '../../components/submission-monitor';
import { paramsToObject } from '../../lib/query-params';

export default class Monitor extends Component {
	render() {
		const params = paramsToObject(window.location.search);
		return (
			<Container>
				<Helmet title="Monitorul de evaluare"/>
				<Header as="h1">Monitorul de evaluare</Header>
				<SubmissionMonitor taskId={params.taskId}/>
			</Container>
		);
	}
}
