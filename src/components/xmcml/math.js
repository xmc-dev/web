import { h } from 'preact';
import katex from 'katex';
import { ErrorMessage } from '../error-message';

export function Math({ code, displayMode } = { code: '', displayMode: false }) {
	try {
		const r = katex.renderToString(code, { displayMode });
		/* eslint-disable-next-line react/no-danger */
		return <div dangerouslySetInnerHTML={{ __html: r }}/>;
	} catch (err) {
		return <ErrorMessage error={err.name} detail={err.message}/>;
	}
}
