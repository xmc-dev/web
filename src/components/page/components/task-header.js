import { h, Component } from 'preact';
import { getTask } from '../../../lib/api/task';
import { getDataset } from '../../../lib/api/dataset';
import { getTaskList } from '../../../lib/api/task-list';
import { Table } from 'semantic-ui-react';
import { ErrorMessage } from '../../error-message';

export class TaskHeader extends Component {
	constructor(props) {
		super(props);
		this.state = { task: {}, dataset: {}, taskList: {}, error: null };
	}

	componentDidMount() {
		getTask(this.props.taskId)
			.then(task => {
				this.setState({ task });
				getDataset(task.datasetId)
					.then(dataset => {
						this.setState({ dataset });
						getTaskList(task.taskListId).then(taskList => {
							this.setState({ taskList });
						});
					})
					.catch(error => {
						throw error;
					});
			})
			.catch(error => {
				this.setState({ error });
			});
	}

	render() {
		if (this.state.error) {
			return <ErrorMessage error={this.state.error.message}/>;
		}
		const t = this.state.task;
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
				</Table.Body>
			</Table>
		);
	}
}
