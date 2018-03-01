import { h, Component } from 'preact';
import Helmet from 'preact-helmet';
import { Container } from 'semantic-ui-react';
import { Link } from 'preact-router';
import { XMCML } from '../../components/xmcml';
import { api, rawApi, getAttachmentContent } from '../../lib/api';
import JsxParser from 'react-jsx-parser';
import { ErrorMessage } from '../../components/error-message';

export class TestComponent extends Component {
	render() {
		return <h1>{this.props.foo} works!</h1>;
	}
}

export default class Page extends Component {
	constructor(props) {
		super(props);
		this.state = {
			page: { version: {} },
			error: null,
			url: props.url,
			content: ''
		};
		this.getContent = this.getContent.bind(this);
	}

	getContent() {
		let url = this.state.url;
		if (url == '/') {
			url = '<root>';
		}
		api('/pages/' + url)
			.then(data => {
				this.setState({ page: data.page });
				return data.page.version;
			})
			.then(data => {
				getAttachmentContent(data.attachmentId)
					.then(att => {
						this.setState({ url: att.url, content: att.data });
					})
					.catch(error => {
						throw error;
					});
			})
			.catch(error => {
				this.setState({ error });
			});
	}

	componentDidMount() {
		this.getContent();
	}

	componentWillReceiveProps(update) {
		this.setState({ url: update.url });
		console.log(update);
		this.getContent();
	}

	render() {
		if (this.state.error) {
			return <ErrorMessage error={this.state.error.message} />;
		}
		return (
			<Container>
				<Helmet title={this.state.page.version.title} />
				<XMCML md={this.state.content} components={{ TestComponent }} />
			</Container>
		);
	}
}
