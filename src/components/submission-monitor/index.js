import { h } from 'preact';
import { Table } from 'semantic-ui-react';
import { SubmissionMonitorRow, SubmissionMonitorHeaderRow } from './row';
import { getSubmissions } from '../../lib/api/submission';
import { Paginate } from '../paginate';

function MonitorTable({ items }) {
	let i = 0;
	const rows = items.map(it => {
		i++;
		return <SubmissionMonitorRow key={i} sub={it}/>;
	});
	return (
		<Table basic selectable padded="very">
			<Table.Header>
				<SubmissionMonitorHeaderRow/>
			</Table.Header>
			<Table.Body>{rows}</Table.Body>
		</Table>
	);
}

function getSubs(taskId) {
	return offset =>
		getSubmissions({
			offset: offset,
			includeResult: true,
			taskId: taskId || ''
		}).then(data => {
			return { meta: data.meta, items: data.submissions };
		});
}

export function SubmissionMonitor({ taskId }) {
	return <Paginate getItems={getSubs(taskId)} component={MonitorTable}/>;
}
