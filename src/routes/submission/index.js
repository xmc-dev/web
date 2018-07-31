import { h, Component } from 'preact';
import { Submission as SubmissionComponent } from '../../components/submission';
import { Title } from '../../components/title';

export default class Submission extends Component {
	render() {
		return (
			<main>
				<Title id="submission.evaluation-report"/>
				<SubmissionComponent id={this.props.match.params.id}/>
			</main>
		);
	}
}
