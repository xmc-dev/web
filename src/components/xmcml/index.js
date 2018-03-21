import { h, Component } from 'preact';
import { Link } from 'react-router-dom';
import JsxParser from 'react-jsx-parser';
import MarkdownIt from 'markdown-it';

export class XMCML extends Component {
	constructor(props) {
		super(props);
		this.props.components = this.props.components || {};
		this.props.bindings = this.props.bindings || {};
		this.state.components = {
			...this.props.components,
			Link
		};
		this.md = new MarkdownIt({ html: true });
	}

	render() {
		const r = this.md.render(this.props.md);
		return (
			<JsxParser
				bindings={this.props.bindings}
				showWarnings
				components={this.state.components}
				jsx={r}
			/>
		);
	}
}
