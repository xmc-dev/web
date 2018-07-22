import { getSubmissions } from './api/submission';
import { Text } from 'preact-i18n';
import { h } from 'preact';

/** Representation of a submission error. */
export class SubmissionError {
	/**
	 * Create a SubmissionError.
	 * @param {string} errMsg - The error message of the submission's result.
	 */
	constructor(errMsg) {
		const s = errMsg.split(':');

		if (s.length < 2) {
			this.code = null;
			this.detail = null;
		} else {
			this.code = s[0];
			this.detail = s.slice(1).join(':');
		}
	}

	toString() {
		let str = this.code;
		if (this.detail) {
			str += ` (${this.detail})`;
		}

		return str;
	}
}

/**
 * Gets a short status string for a submission.
 * @param {Submission} sub - The submission.
 */
export function getShortStatus(sub) {
	if (sub.result) {
		const err = new SubmissionError(sub.result.errorMessage);
		if (!err.code) {
			return (
				<Text
					id="submission-status.done-no-err"
					plural={sub.result.score}
					fields={{ points: sub.result.score }}
				/>
			);
		}
		return (
			<Text
				id="submission-status.done-err"
				fields={{ error: err.toString() }}
			/>
		);
	}
	switch (sub.state) {
		case 'WAITING':
			return <Text id="submission-status.waiting"/>;
		case 'PROCESSING':
			return <Text id="submission-status.processing"/>;
		case 'DONE':
			return <Text id="submission-status.done"/>;
		default:
			return sub.state;
	}
}

export function lastScore(taskId, userId) {
	return getSubmissions({
		taskId,
		userId,
		includeResult: true,
		perPage: 1
	}).then(
		sub =>
			sub.submissions[0] && sub.submissions[0].result ?
				sub.submissions[0].result.score :
				-1
	);
}
