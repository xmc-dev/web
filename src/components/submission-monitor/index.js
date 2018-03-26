import { Component } from 'preact';
import { Table } from 'semantic-ui-react';
import { ErrorMessage } from '../error-message';
import { SubmissionMonitorRow, SubmissionMonitorHeaderRow } from './row';
import { api } from '../../lib/api';
import { getSubmissions } from '../../lib/api/submission';

export class SubmissionMonitor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			submissions: [],
			error: null
		};
	}

	componentDidMount() {
		getSubmissions({ includeResult: true, taskId: this.props.taskId || '' })
			.then(subs => {
				const submissions = subs.map(sub => {
					return <SubmissionMonitorRow sub={sub} />;
				});
				this.setState({ submissions });
			})
			.catch(error => {
				this.setState({ error });
			});
	}

	render() {
		if (this.state.error) {
			return <ErrorMessage error={this.state.error.message} />;
		}
		return (
			<Table celled striped selectable>
				<Table.Header>
					<SubmissionMonitorHeaderRow />
				</Table.Header>
				<Table.Body>{this.state.submissions}</Table.Body>
			</Table>
		);
	}
}
