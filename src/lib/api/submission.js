import { api } from '../api';
import { objectToParams } from '../query-params';
import { stringDate } from '../date';

function processTestResult(raw) {
	return Object.assign({}, raw, { score: parseFloat(raw.score) });
}

function processResult(raw) {
	if (!raw) {
		return null;
	}
	let testResults;
	if (raw.testResults) {
		testResults = [];
		for (const t of raw.testResults) {
			testResults.push(processTestResult(t));
		}
	}
	return Object.assign({}, raw, {
		score: parseFloat(raw.score),
		testResults
	});
}

function processSubmission(raw) {
	const dates = {
		createdAt: stringDate(raw.createdAt),
		finishedAt: stringDate(raw.finishedAt)
	};
	return Object.assign({}, raw, {
		...dates,
		result: processResult(raw.result)
	});
}

/**
 *
 * @param {string} submissionId
 * @param {bool} includeResult
 * @param {bool} includeTestResults
 * @param {object} options
 */
export function getSubmission(
	submissionId,
	{ includeResult, includeTestResults },
	options
) {
	return api(
		'/submissions/' +
			submissionId +
			'?' +
			objectToParams({
				includeResult,
				includeTestResults
			})
	).then(raw => processSubmission(raw.submission));
}

export function getSubmissions(params, options) {
	return api('/submissions/?' + objectToParams(params)).then(raws =>
		raws.submissions.map(processSubmission)
	);
}
