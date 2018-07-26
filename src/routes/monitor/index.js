import { h, Component } from 'preact';
import Helmet from 'preact-helmet';
import { Container, Segment } from 'semantic-ui-react';
import { SubmissionMonitor } from '../../components/submission-monitor';
import { Header } from '../../components/page/components/header';
import { paramsToObject } from '../../lib/query-params';

export default class Monitor extends Component {
	render() {
		const params = paramsToObject(window.location.search);
		return (
			<main>
				<Helmet title="Monitorul de evaluare"/>
				<Header title="Monitorul de evaluare"/>
				<Container className="luchian no-mobile-margin">
					<Segment className="luchian no-padding">
						<SubmissionMonitor taskId={params.taskId}/>
					</Segment>
				</Container>
			</main>
		);
	}
}
