import { h, Component } from 'preact';
import { Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { getShortStatus } from '../../lib/submission';
import { stringDate } from '../../lib/date';
import { getTask } from '../../lib/api/task';
import { getTaskList, getTaskListUrl } from '../../lib/api/task-list';

export class SubmissionMonitorRow extends Component {
	constructor(props) {
		super(props);
		this.state = { task: { name: '' }, taskListUrl: '' };
	}

	componentDidMount() {
		getTask(this.props.sub.taskId)
			.then(t => {
				this.setState({ task: t });
				if (t) {
					getTaskList(t.taskListId).then(tl => {
						this.setState({ taskListUrl: getTaskListUrl(tl) });
					});
				}
			})
			.catch(err => {});
	}

	render() {
		const sub = this.props.sub;
		let score = 0;
		if (sub.result) {
			score = sub.result.score;
		}

		let taskCell = <Table.Cell>{this.state.task.title}</Table.Cell>;
		if (this.state.taskListUrl) {
			taskCell = (
				<Table.Cell>
					<Link to={this.state.taskListUrl + '/' + this.state.task.name}>
						{this.state.task.title}
					</Link>
				</Table.Cell>
			);
		}

		return (
			<Table.Row>
				<Table.Cell>
					<Link to={`/submissions/${sub.id}`}>{sub.id}</Link>
				</Table.Cell>
				{taskCell}
				<Table.Cell>{stringDate(sub.createdAt)}</Table.Cell>
				<Table.Cell>{stringDate(sub.finishedAt)}</Table.Cell>
				<Table.Cell>{getShortStatus(sub)}</Table.Cell>
			</Table.Row>
		);
	}
}

export function SubmissionMonitorHeaderRow() {
	return (
		<Table.Row>
			<Table.HeaderCell>ID</Table.HeaderCell>
			<Table.HeaderCell>Problema</Table.HeaderCell>
			<Table.HeaderCell>Data trimiterii</Table.HeaderCell>
			<Table.HeaderCell>Data terminării job-ului</Table.HeaderCell>
			<Table.HeaderCell>Stare</Table.HeaderCell>
		</Table.Row>
	);
}
