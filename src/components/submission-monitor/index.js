import { Component } from 'preact';
import { Table, Container, Pagination, Icon } from 'semantic-ui-react';
import { ErrorMessage } from '../error-message';
import { SubmissionMonitorRow, SubmissionMonitorHeaderRow } from './row';
import { api } from '../../lib/api';
import { getSubmissions } from '../../lib/api/submission';
import { Paginate } from '../paginate';

function MonitorTable({ items }) {
	return (
		<Table celled striped selectable>
			<Table.Header>
				<SubmissionMonitorHeaderRow />
			</Table.Header>
			<Table.Body>
				{items.map(it => <SubmissionMonitorRow sub={it} />)}
			</Table.Body>
		</Table>
	);
}

export class SubmissionMonitor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			submissions: [],
			error: null,
			meta: {},
			page: 1
		};
		this.getSubmissions = this.getSubmissions.bind(this);
	}

	getSubmissions(offset) {
		return getSubmissions({
			offset: offset,
			includeResult: true,
			taskId: this.props.taskId || ''
		})
			.then(data => {
				return { meta: data.meta, items: data.submissions };
			})
			.catch(error => {
				this.setState({ error });
			});
	}

	render() {
		return <Paginate getItems={this.getSubmissions} component={MonitorTable} />;
	}
}
