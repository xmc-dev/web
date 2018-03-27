import { h, Component } from 'preact';
import { Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { getShortStatus } from '../../lib/submission';
import { stringDate } from '../../lib/date';
import { getTask } from '../../lib/api/task';
import { getTaskList, getTaskListUrl } from '../../lib/api/task-list';
import { getAccount } from '../../lib/api/account';

export class SubmissionMonitorRow extends Component {
	constructor(props) {
		super(props);
		this.state = {
			task: { name: '' },
			taskListUrl: '',
			account: {},
			taskErr: '',
			taskListErr: '',
			accountErr: ''
		};
		this.updateStuff = this.updateStuff.bind(this);
	}

	componentDidMount() {
		this.updateStuff(this.props.sub);
	}

	updateStuff(sub) {
		getTask(sub.taskId)
			.then(t => {
				this.setState({ task: t, taskErr: '' });
				if (t) {
					getTaskList(t.taskListId)
						.then(tl => {
							this.setState({
								taskListUrl: getTaskListUrl(tl),
								taskListErr: ''
							});
						})
						.catch(error => this.setState({ taskListErr: error.message }));
				}
			})
			.catch(error => this.setState({ taskErr: error.message }));
		getAccount(sub.userId)
			.then(acc => {
				this.setState({ account: acc, accountErr: '' });
			})
			.catch(error => {
				this.setState({ accountErr: error.message });
			});
	}

	/**
	 * So it looks like when we change the page with the pagination buttons,
	 * instead of instancing new SubmissionMonitorRows, preact just changes the props.
	 * So we update the stuff.
	 *
	 * @param {object} newProps
	 */
	componentWillReceiveProps(newProps) {
		if (
			newProps.sub.id !== this.props.sub.id ||
			newProps.sub.state !== this.props.sub.state
		) {
			console.warn(newProps.sub.id + ': ' + newProps.sub.userId);
			this.updateStuff(newProps.sub);
		}
	}

	render() {
		const sub = this.props.sub;
		let score = 0;
		if (sub.result) {
			score = sub.result.score;
		}

		let taskCell = this.state.task.title;
		if (this.state.taskErr) {
			taskCell = this.state.taskErr;
		} else if (!this.state.taskListErr) {
			taskCell = (
				<Link to={this.state.taskListUrl + '/' + this.state.task.name}>
					{this.state.task.title}
				</Link>
			);
		}

		const accountCell =
			this.state.accountErr ||
			`${this.state.account.name} (${this.state.account.clientId})`;

		return (
			<Table.Row>
				<Table.Cell>
					<Link to={`/submissions/${sub.id}`}>{sub.id}</Link>
				</Table.Cell>
				<Table.Cell>{accountCell}</Table.Cell>
				<Table.Cell>{taskCell}</Table.Cell>
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
			<Table.HeaderCell>Utilizator</Table.HeaderCell>
			<Table.HeaderCell>Problema</Table.HeaderCell>
			<Table.HeaderCell>Data trimiterii</Table.HeaderCell>
			<Table.HeaderCell>Data terminării job-ului</Table.HeaderCell>
			<Table.HeaderCell>Stare</Table.HeaderCell>
		</Table.Row>
	);
}
