import { h } from 'preact';
import { Table } from 'semantic-ui-react';
import { stringDate } from '../../lib/date';
import { byteSizeToString } from '../../lib/data-size';

/**
 * Info table of the submission view component.
 *
 * @param {object} props
 * @param {Submission} props.submission
 * @param {Attachment} props.attachment
 * @param {Task} props.task
 */
export function InfoTable({ submission, attachment, task, codeUrl }) {
	const sub = submission;
	const result = sub.result || {};
	const toShow = [
		['Stare', sub.state],
		['Compilator', sub.language],
		['Data trimiterii', stringDate(sub.createdAt)],
		['Data evaluarii', stringDate(sub.finishedAt)],
		// eslint-disable-next-line react/jsx-key
		['Marime', <a href={codeUrl}>{byteSizeToString(attachment.size)}</a>],
		['Problema', task.name || ((task.error && task.error.message) || '')]
	];
	const rows = [];
	for (let i = 0; i < toShow.length; i += 2) {
		if (i === toShow.length - 1) {
			rows.push(
				<Table.Row>
					<Table.Cell>{toShow[i][0]}</Table.Cell>
					<Table.Cell>{toShow[i][1]}</Table.Cell>
				</Table.Row>
			);
		} else {
			rows.push(
				<Table.Row>
					<Table.Cell>{toShow[i][0]}</Table.Cell>
					<Table.Cell>{toShow[i][1]}</Table.Cell>
					<Table.Cell>{toShow[i + 1][0]}</Table.Cell>
					<Table.Cell>{toShow[i + 1][1]}</Table.Cell>
				</Table.Row>
			);
		}
	}
	rows.push(
		<Table.Row>
			<Table.Cell colSpan="3">Scor</Table.Cell>
			<Table.Cell>{result.score}</Table.Cell>
		</Table.Row>
	);
	return (
		<Table celled>
			<Table.Body>{rows}</Table.Body>
		</Table>
	);
}
