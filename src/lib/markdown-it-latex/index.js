/* eslint-disable camelcase, max-params */
/* Modified from here
https://github.com/tylingsoft/markdown-it-latex/blob/master/src/index.js */
import asciimath2latex from 'asciimath-to-latex';

const mathBlock = code => {
	let tex = '';
	code.split(/(?:\n\s*){2,}/).forEach(line => {
		// Consecutive new lines means a new formula
		tex += `<Math code={${JSON.stringify(line.trim())}} displayMode/>`;
	});
	return `<div>${tex}</div>`;
};

const LatexPlugin = md => {
	// Inline math
	const temp1 = md.renderer.rules.code_inline.bind(md.renderer.rules);
	md.renderer.rules.code_inline = (tokens, idx, options, env, slf) => {
		let code = tokens[idx].content;
		if (code.startsWith('@') && code.endsWith('@')) {
			code = '$' + asciimath2latex(code.substr(1, code.length - 2)) + '$';
		}
		if (code.startsWith('$') && code.endsWith('$')) {
			// Inline math
			code = code.substr(1, code.length - 2);
			return `<Math code={${JSON.stringify(code)}} />`;
		}
		return temp1(tokens, idx, options, env, slf);
	};

	// Fenced math block
	const temp2 = md.renderer.rules.fence.bind(md.renderer.rules);
	md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
		let token = tokens[idx];
		let code = token.content.trim();
		if (token.info === 'math' || token.info === 'katex') {
			// Math
			return mathBlock(code);
		}
		if (/^ascii-?math/i.test(token.info)) {
			code = code
				.split(/(?:\n\s*){2,}/)
				.map(item => {
					return asciimath2latex(item);
				})
				.join('\n\n');
			return mathBlock(code);
		}
		return temp2(tokens, idx, options, env, slf);
	};
};

export default LatexPlugin;
/* eslint-enable camelcase, max-params */
