import { h } from 'preact';
import { Table } from 'semantic-ui-react';
import { Text } from 'preact-i18n';

export function TestResultsTable({ testResults, finalScore }) {
	if (!testResults || testResults.length === 0) {
		return;
	}
	const header = (
		<Table.Header>
			<Table.Row>
				<Table.HeaderCell>#</Table.HeaderCell>
				<Table.HeaderCell>
					<Text id="submission.time"/>
				</Table.HeaderCell>
				<Table.HeaderCell>
					<Text id="submission.memory"/>
				</Table.HeaderCell>
				<Table.HeaderCell>
					<Text id="submission.message"/>
				</Table.HeaderCell>
				<Table.HeaderCell>
					<Text id="submission.points"/>
				</Table.HeaderCell>
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
		<Table celled selectable>
			{header}

			<Table.Body>{rows}</Table.Body>

			<Table.Footer>
				<Table.Row>
					<Table.HeaderCell colSpan="4">
						<Text id="submission.final-score"/>
					</Table.HeaderCell>
					<Table.HeaderCell>{finalScore}</Table.HeaderCell>
				</Table.Row>
			</Table.Footer>
		</Table>
	);
}
