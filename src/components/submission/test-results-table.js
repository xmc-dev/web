import { h, Component } from 'preact';
import { Table } from 'semantic-ui-react';

export function TestResultsTable({ testResults }) {
	if (!testResults || testResults.length == 0) {
		return;
	}
	const header = (
		<Table.Header>
			<Table.Row>
				<Table.HeaderCell>#</Table.HeaderCell>
				<Table.HeaderCell>Timp</Table.HeaderCell>
				<Table.HeaderCell>Memorie folosită (KB)</Table.HeaderCell>
				<Table.HeaderCell>Mesaj</Table.HeaderCell>
				<Table.HeaderCell>Punctaj</Table.HeaderCell>
			</Table.Row>
		</Table.Header>
	);

	let rows = [];
	for (const t of testResults) {
		rows.push(
			<Table.Row>
				<Table.Cell>{t.testNo}</Table.Cell>
				<Table.Cell>{t.time}</Table.Cell>
				<Table.Cell>{t.memory}</Table.Cell>
				<Table.Cell>{t.graderMessage}</Table.Cell>
				<Table.Cell>{parseFloat(t.score) * 100}</Table.Cell>
			</Table.Row>
		);
	}

	return (
		<Table celled striped>
			{header}

			<Table.Body>
				{rows}
			</Table.Body>
		</Table>
	);
}