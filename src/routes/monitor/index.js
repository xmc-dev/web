import { h, Component } from 'preact';
import { Container, Segment } from 'semantic-ui-react';
import { SubmissionMonitor } from '../../components/submission-monitor';
import { Header } from '../../components/page/components/header';
import { paramsToObject } from '../../lib/query-params';
import { Title } from '../../components/title';
import { Text } from 'preact-i18n';

export default class Monitor extends Component {
	render() {
		const params = paramsToObject(window.location.search);
		return (
			<main>
				<Title id="submission-monitor.title"/>
				<Header title={<Text id="submission-monitor.title"/>}/>
				<Container className="luchian no-mobile-margin">
					<Segment className="luchian no-padding">
						<SubmissionMonitor taskId={params.taskId}/>
					</Segment>
				</Container>
			</main>
		);
	}
}
