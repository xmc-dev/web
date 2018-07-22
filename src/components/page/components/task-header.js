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
			<Table celled>
				<Table.Body>
					<Table.Row>
						<Table.Cell>
							<Text id="task-header.input-output-files"/>
						</Table.Cell>
						<Table.Cell>
							{t.inputFile}, {t.outputFile}
						</Table.Cell>
						<Table.Cell>
							<Text id="task-header.your-score"/>
						</Table.Cell>
						<Table.Cell>
							{this.state.lastScore === -1 ? 'N/A' : this.state.lastScore}
						</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>
							<Text id="task-header.time-limit"/>
						</Table.Cell>
						<Table.Cell>{d.timeLimit}</Table.Cell>
						<Table.Cell>
							<Text id="task-header.memory-limit"/>
						</Table.Cell>
						<Table.Cell>{d.memoryLimit} KB</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell colSpan="2">
							<Text id="task-header.round"/>
						</Table.Cell>
						<Table.Cell colSpan="2">{tl.title}</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell colSpan="2">
							<Text id="task-header.id"/>
						</Table.Cell>
						<Table.Cell colSpan="2">{t.id}</Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table>
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
