import { h, Component } from 'preact';
import { getDataset } from '../../../lib/api/dataset';
import { getTaskList } from '../../../lib/api/task-list';
import { Table } from 'semantic-ui-react';
import { ErrorMessage } from '../../error-message';
import { connect } from 'preact-redux';
import { readTaskIfNeeded } from '../../../actions/tasks';

class ConnectedTaskHeader extends Component {
	constructor(props) {
		super(props);
		this.state = { dataset: {}, taskList: {}, error: null };
		this.updateStuff = this.updateStuff.bind(this);
	}

	componentDidMount() {
		this.props
			.getTask(this.props.taskId)
			.then(() => this.updateStuff(this.props));
	}

	updateStuff(props) {
		const task = props.task;
		if (task && !task.isFetching && !task.error) {
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

	componentWillReceiveProps(newProps) {
		if (newProps.task === this.props.task) {
			return;
		}
		this.updateStuff(newProps);
	}

	render() {
		if (this.state.error) {
			return <ErrorMessage error={this.state.error.message}/>;
		}
		const t = this.props.task;
		const d = this.state.dataset;
		const tl = this.state.taskList;
		return (
			<Table celled>
				<Table.Body>
					<Table.Row>
						<Table.Cell>Fisierul de intrare/iesire:</Table.Cell>
						<Table.Cell>
							{t.inputFile}, {t.outputFile}
						</Table.Cell>
						<Table.Cell>Scorul tau</Table.Cell>
						<Table.Cell>0 (nu e implementat, placeholder)</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>Limita de timp</Table.Cell>
						<Table.Cell>{d.timeLimit}</Table.Cell>
						<Table.Cell>Limita de memorie</Table.Cell>
						<Table.Cell>{d.memoryLimit} KB</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell colSpan="2">Concurs</Table.Cell>
						<Table.Cell colSpan="2">{tl.title}</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell colSpan="2">ID</Table.Cell>
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
