import { h, Component } from 'preact';
import { Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Text } from 'preact-i18n';
import { getShortStatus } from '../../lib/submission';
import { stringDate } from '../../lib/date';
import { getTaskList, getTaskListUrl } from '../../lib/api/task-list';
import { getAccount } from '../../lib/api/account';
import { connect } from 'preact-redux';
import { readTaskIfNeeded } from '../../actions/tasks';

class ConnectedSubmissionMonitorRow extends Component {
	constructor(props) {
		super(props);
		this.state = {
			taskListUrl: '',
			account: {},
			taskListErr: '',
			accountErr: ''
		};
		this.updateStuff = this.updateStuff.bind(this);
	}

	componentDidMount() {
		this.props
			.getTask(this.props.sub.taskId)
			.then(() => this.updateStuff(this.props));
	}

	updateStuff(props) {
		const t = props.task;
		if (t && !t.isFetching && !t.error) {
			getTaskList(t.taskListId)
				.then(tl => {
					this.setState({
						taskListUrl: getTaskListUrl(tl),
						taskListErr: ''
					});
				})
				.catch(error => this.setState({ taskListErr: error.message }));
		}
		getAccount(props.sub.userId)
			.then(acc => {
				this.setState({ account: acc.account, accountErr: '' });
			})
			.catch(error => {
				this.setState({ accountErr: error.message });
			});
	}

	componentDidUpdate(oldProps) {
		if (
			this.props.task !== oldProps.task ||
			this.props.sub.id !== oldProps.sub.id ||
			this.props.sub.state !== oldProps.sub.state
		) {
			this.props
				.getTask(this.props.sub.taskId)
				.then(() => this.updateStuff(this.props));
		}
	}

	render() {
		const sub = this.props.sub;

		let taskCell = this.props.task.title;
		if (this.props.task.error) {
			taskCell = this.props.task.error.message;
		} else if (!this.state.taskListErr) {
			taskCell = (
				<Link to={this.state.taskListUrl + '/' + this.props.task.name}>
					{this.props.task.title}
				</Link>
			);
		}

		const accountCell =
			this.state.accountErr ||
			`${this.state.account.name} (${this.state.account.clientId})`;

		return (
			<Table.Row>
				<Table.Cell>{accountCell}</Table.Cell>
				<Table.Cell>{taskCell}</Table.Cell>
				<Table.Cell>{stringDate(sub.createdAt)}</Table.Cell>
				<Table.Cell>{stringDate(sub.finishedAt)}</Table.Cell>
				<Table.Cell>
					<Link to={`/submissions/${sub.id}`}>{getShortStatus(sub)}</Link>
				</Table.Cell>
			</Table.Row>
		);
	}
}

export const SubmissionMonitorRow = connect(
	(state, props) => ({
		task: state.tasks.byId[props.sub.taskId] || {}
	}),
	dispatch => ({
		getTask: id => dispatch(readTaskIfNeeded(id))
	})
)(ConnectedSubmissionMonitorRow);

export function SubmissionMonitorHeaderRow() {
	return (
		<Table.Row>
			<Table.HeaderCell>
				<Text id="submission-monitor.header.user"/>
			</Table.HeaderCell>
			<Table.HeaderCell>
				<Text id="submission-monitor.header.problem"/>
			</Table.HeaderCell>
			<Table.HeaderCell>
				<Text id="submission-monitor.header.submission-date"/>
			</Table.HeaderCell>
			<Table.HeaderCell>
				<Text id="submission-monitor.header.finish-date"/>
			</Table.HeaderCell>
			<Table.HeaderCell>
				<Text id="submission-monitor.header.state"/>
			</Table.HeaderCell>
		</Table.Row>
	);
}
