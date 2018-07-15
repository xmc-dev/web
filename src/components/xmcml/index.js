import { h, Component } from 'preact';
import { Link } from 'react-router-dom';
import JsxParser from 'react-jsx-parser';
import MarkdownIt from 'markdown-it';
import MarkdownItLatex from '../../lib/markdown-it-latex';
import { ErrorMessage } from '../error-message';
import { Math } from './math';

export class XMCML extends Component {
	constructor(props) {
		super(props);
		this.props.components = this.props.components || {};
		this.props.bindings = this.props.bindings || {};
		this.state.components = {
			...this.props.components,
			Link,
			Math
		};
		this.md = new MarkdownIt({ html: true });
		// This MarkdownItLatex thing inserts into the markup
		// <Math> tags.
		this.md.use(MarkdownItLatex);
	}

	/*
		This function is complicated. Let me explain what it does:

		Macros come from the backend encoded like this:
		!!MacroName{"json": "params", "happy": true}!!

		We must transform them to become like this (JSX):
		<MacroName json={"params"} happy={true} />
	*/
	processMacros(md) {
		// First capture group is the macro name, the other is the params
		const rx = new RegExp('!!(\\w+)({.*})!!', 'gmi');

		// JS is so shit linters will be upset
		/* eslint-disable */
		return md.replace(rx, (match, p1, p2, offset, str) => {
			// We parse the params so we can iterate over them
			const rawParams = JSON.parse(p2);
			// This will be the end result
			const params = [];
			for (const key in rawParams) {
				if (!rawParams.hasOwnProperty(key)) {
					continue;
				}
				if (typeof rawParams[key] === 'string') {
					params.push(`${key}="${rawParams[key]}"`);
				} else {
					// It becomes key={value}
					// We stringify it because we are returning the JSX as a string
					params.push(`${key}={${JSON.stringify(rawParams[key])}}`);
				}
			}

			return `<${p1} ${params.join(' ')} />`;
		});
		/* eslint-enable */
	}

	render() {
		try {
			const p = this.processMacros(this.props.md);
			const r = this.md.render(p);
			console.log(r);
			return (
				<JsxParser
					bindings={this.props.bindings}
					showWarnings={this.props.showWarnings}
					components={this.state.components}
					jsx={r}
				/>
			);
		} catch (err) {
			return <ErrorMessage error={err.name} detail={err.message}/>;
		}
	}
}
