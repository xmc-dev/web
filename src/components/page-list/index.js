import { h } from 'preact';
import { Table, Icon } from 'semantic-ui-react';

export function PageList() {
	return (
		<div>
			<Table fixed>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell width={4}>
							<Icon name="file outline"/>/
						</Table.HeaderCell>
						<Table.HeaderCell width={9}>Description</Table.HeaderCell>
						<Table.HeaderCell width={3} textAlign="right">
							one month ago
						</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					<Table.Row>
						<Table.Cell colSpan={3}>
							<Icon name="reply"/>..
						</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>
							<Icon name="file outline"/>/archive
						</Table.Cell>
						<Table.Cell>Problem archive</Table.Cell>
						<Table.Cell textAlign="right">yesterday</Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table>
		</div>
	);
}
