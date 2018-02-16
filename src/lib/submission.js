/** Representation of a submission error. */
export class SubmissionError {
    /**
     * Create a SubmissionError.
     * @param {string} errMsg - The error message of the submission's result.
     */
    constructor(errMsg) {
        let s = errMsg.split(':');

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
    if (!sub.result) {
        switch (sub.state) {
            case 'WAITING': return 'În așteptare'; break;
            case 'PROCESSING': return 'În lucru'; break;
        }
    } else {
        let msg = 'Evaluare completă: ';
        let err = new SubmissionError(sub.result.errorMessage);
        if (!err.code) {
            return msg + sub.result.score + ' puncte';
        } else {
            return msg + err.toString();
        }
    }

    return "";
}