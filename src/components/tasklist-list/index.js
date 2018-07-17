import { h } from 'preact';
import { getTaskLists } from '../../lib/api/task-list';
import { Table } from 'semantic-ui-react';
import { Paginate } from '../paginate';
import { TaskListTableHeaderRow, TaskListTableRow } from './row';

export function TaskListTable({ items }) {
	let i = 0;
	const rows = items.map(it => {
		i++;
		return <TaskListTableRow key={i} taskList={it}/>;
	});

	return (
		<Table celled striped selectable>
			<Table.Header>
				<TaskListTableHeaderRow/>
			</Table.Header>
			<Table.Body>{rows}</Table.Body>
		</Table>
	);
}

function getTls() {
	return offset =>
		getTaskLists({ offset }).then(data => {
			const r = {
				meta: data.meta,
				items: data.taskLists
			};
			return r;
		});
}

export function TaskListList() {
	return <Paginate getItems={getTls()} component={TaskListTable}/>;
}
