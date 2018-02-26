import { h, Component } from 'preact';
import { Container } from 'semantic-ui-react';
import { Submission as CSubmission } from '../../components/submission';
import Helmet from 'preact-helmet';
import { ErrorMessage } from '../../components/error-message';

export default class Submission extends Component {
	render() {
		return (
			<Container>
				<Helmet title="Monitorul de evaluare" />
				<CSubmission id={this.props.id} />
			</Container>
		);
	}
}
