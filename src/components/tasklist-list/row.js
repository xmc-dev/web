import { h, Component } from 'preact';
import { Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export function TaskListTableHeaderRow() {
	return (
		<Table.Row>
			<Table.HeaderCell>ID</Table.HeaderCell>
		</Table.Row>
	);
}

export class TaskListTableRow extends Component {
	render() {
		return (
			<Table.Row>
				<Table.Cell>
					<Link to={this.props.taskList.path}>{this.props.taskList.title}</Link>
				</Table.Cell>
			</Table.Row>
		);
	}
}
