import { h } from 'preact';
import { Table } from 'semantic-ui-react';
import { Text } from 'preact-i18n';
import { stringDate } from '../../lib/date';
import { byteSizeToString } from '../../lib/data-size';

function attachmentLink(submission, codeUrl, attachment) {
	if (submission.censored) {
		return <Text id="submission.censored"/>;
	}
	return <a href={codeUrl}>{byteSizeToString(attachment.size)}</a>;
}

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
	/* eslint-disable react/jsx-key */
	const toShow = [
		[<Text id="submission.status"/>, sub.state],
		[<Text id="submission.compiler"/>, sub.language],
		[<Text id="submission.submission-date"/>, stringDate(sub.createdAt)],
		[<Text id="submission.evaluation-date"/>, stringDate(sub.finishedAt)],
		[
			<Text id="submission.size"/>,
			attachmentLink(submission, codeUrl, attachment)
		],
		[
			<Text id="submission.problem"/>,
			task.name || ((task.error && task.error.message) || '')
		]
	];
	/* eslint-enable react/jsx-key */
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
			<Table.Cell colSpan="3">
				<Text id="submission.score"/>
			</Table.Cell>
			<Table.Cell>
				{(typeof result.score === 'number' && result.score) || (
					<Text id="submission.censored"/>
				)}
			</Table.Cell>
		</Table.Row>
	);
	return (
		<Table celled>
			<Table.Body>{rows}</Table.Body>
		</Table>
	);
}
