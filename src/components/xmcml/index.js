import { h, Component } from 'preact';
import JsxParser from 'react-jsx-parser';
import MarkdownIt from 'markdown-it';

export class XMCMD extends Component {
    md;

    constructor(props) {
        super(props);
        this.md = new MarkdownIt({html: true});
    }

    render() {
        const r = this.md.render(this.props.md);
        return <JsxParser components={this.props.bindings} jsx={r} />;
    }
}