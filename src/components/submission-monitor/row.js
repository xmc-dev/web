import { h, Component } from 'preact';
import { Table } from 'semantic-ui-react';
import { Link } from 'preact-router/match';
import { getShortStatus } from '../../lib/submission';
import { stringDate } from '../../lib/date';

export function SubmissionMonitorRow(props) {
	const sub = props.sub;
	let score = 0;
	if (sub.result) {
		score = sub.result.score;
	}
	const createdAt = stringDate(sub.createdAt);
	const finishedAt = stringDate(sub.finishedAt);
	return (
		<Table.Row>
			<Table.Cell>
				<Link href={`/submissions/${sub.id}`}>{sub.id}</Link>
			</Table.Cell>
			<Table.Cell>{createdAt}</Table.Cell>
			<Table.Cell>{finishedAt}</Table.Cell>
			<Table.Cell>{getShortStatus(sub)}</Table.Cell>
		</Table.Row>
	);
}

export function SubmissionMonitorHeaderRow() {
	return (
		<Table.Row>
			<Table.HeaderCell>ID</Table.HeaderCell>
			<Table.HeaderCell>Data trimiterii</Table.HeaderCell>
			<Table.HeaderCell>Data terminării job-ului</Table.HeaderCell>
			<Table.HeaderCell>Stare</Table.HeaderCell>
		</Table.Row>
	);
}
