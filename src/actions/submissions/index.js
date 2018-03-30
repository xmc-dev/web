import { getSubmission } from '../../lib/api/submission';

export const READ_SUBMISSION_REQUEST = 'READ_SUBMISSION_REQUEST';
export const READ_SUBMISSION_SUCCESS = 'READ_SUBMISSION_SUCCESS';
export const READ_SUBMISSION_FAILURE = 'READ_SUBMISSION_FAILURE';

export const readSubmissionRequest = id => ({
	type: READ_SUBMISSION_REQUEST,
	id
});
export const readSubmissionSuccess = (id, submission) => ({
	type: READ_SUBMISSION_SUCCESS,
	id,
	submission
});
export const readSubmissionFailure = (id, error) => ({
	type: READ_SUBMISSION_FAILURE,
	id,
	error
});

export function readSubmission(id, { includeResult, includeTestResults } = {}) {
	return dispatch => {
		dispatch(readSubmissionRequest(id));
		return getSubmission(id, { includeResult, includeTestResults })
			.then(sub => dispatch(readSubmissionSuccess(id, sub)))
			.catch(error => dispatch(readSubmissionFailure(id, error)));
	};
}
