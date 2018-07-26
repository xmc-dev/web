import { h, Component } from 'preact';
import { getDataset } from '../../../lib/api/dataset';
import { getTaskList } from '../../../lib/api/task-list';
import { Table } from 'semantic-ui-react';
import { ErrorMessage } from '../../error-message';
import { connect } from 'preact-redux';
import { readTaskIfNeeded } from '../../../actions/tasks';
import { getAccount } from '../../../lib/api/account';
import { lastScore } from '../../../lib/submission';
import { Text } from 'preact-i18n';
import { TaskInfo } from './task-info';

class ConnectedTaskHeader extends Component {
	constructor(props) {
		super(props);
		this.state = { dataset: {}, taskList: {}, error: null, lastScore: -1 };
		this.updateStuff = this.updateStuff.bind(this);
	}

	componentDidMount() {
		this.props
			.getTask(this.props.taskId)
			.then(() => this.updateStuff(this.props));
	}

	updateStuff(props) {
		const task = props.task;
		if (task && task.isFetching === false && !task.error) {
			getAccount()
				.then(acc => lastScore(props.taskId, acc.account.uuid))
				.then(score => this.setState({ lastScore: score }))
				.catch(err => {
					if (err.name !== 'Unauthorized') {
						throw err;
					}
				});
			getDataset(task.datasetId)
				.then(dataset => {
					this.setState({ dataset });
					getTaskList(task.taskListId).then(taskList => {
						this.setState({ taskList });
					});
				})
				.catch(error => {
					this.setState({ error });
				});
		}
	}

	componentDidUpdate(oldProps) {
		if (this.props.task === oldProps.task) {
			return;
		}
		this.updateStuff(this.props);
	}

	render() {
		if (this.state.error) {
			return (
				<ErrorMessage
					error={this.state.error.name}
					detail={this.state.error.message}
				/>
			);
		}
		const t = this.props.task;
		const d = this.state.dataset;
		const tl = this.state.taskList;
		return (
			<TaskInfo
				items={[
					{
						label: <Text id="task-header.time-limit"/>,
						value: d.timeLimit
					},
					{
						label: <Text id="task-header.memory-limit"/>,
						value: d.memoryLimit
					},
					{
						label: <Text id="task-header.input-files"/>,
						value: t.inputFile,
						monospace: true
					},
					{
						label: <Text id="task-header.output-files"/>,
						value: t.outputFile,
						monospace: true
					},
					{
						label: <Text id="task-header.your-score"/>,
						value: this.state.lastScore === -1 ? 'N/A' : this.state.lastScore
					}
				]}
			/>
		);
	}
}

export const TaskHeader = connect(
	(state, props) => ({
		task: state.tasks.byId[props.taskId] || {}
	}),
	dispatch => ({
		getTask: id => dispatch(readTaskIfNeeded(id))
	})
)(ConnectedTaskHeader);
