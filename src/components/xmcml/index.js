import { h, Component } from 'preact';
import JsxParser from 'react-jsx-parser';
import MarkdownIt from 'markdown-it';

export class XMCML extends Component {
	constructor(props) {
		super(props);
		this.md = new MarkdownIt({ html: true });
	}

	render() {
		const r = this.md.render(this.props.md);
		return <JsxParser components={this.props.components} jsx={r} />;
	}
}
