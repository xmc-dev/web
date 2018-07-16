import { getSubmissions } from './api/submission';

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
		const msg = 'Evaluare completă: ';
		const err = new SubmissionError(sub.result.errorMessage);
		if (!err.code) {
			return msg + sub.result.score + ' puncte';
		}
		return msg + err.toString();
	}
	switch (sub.state) {
		case 'WAITING':
			return 'În așteptare';
		case 'PROCESSING':
			return 'În lucru';
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
