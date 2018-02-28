import { h, Component } from 'preact';
import Helmet from 'preact-helmet';
import { Container } from 'semantic-ui-react';
import { XMCML } from '../../components/xmcml';
import { api, rawApi, getAttachmentContent } from '../../lib/api';

export class TestComponent extends Component {
	render() {
		return <h1>{this.props.foo} works!</h1>;
	}
}

export default class Page extends Component {
	constructor(props) {
		super(props);
		this.state = {
			page: {},
			url: '',
			content: ''
		};
		this.getContent = this.getContent.bind(this);
	}

	getContent() {
		api('/pages' + this.props.url)
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
				throw error;
			});
	}

	componentWillMount() {
		this.getContent();
	}

	componentWillReceiveProps(update) {
		this.getContent();
	}

	render() {
		return (
			<Container>
				<Helmet title="AAAA" />
				<XMCML md={this.state.content} components={{ TestComponent }} />
			</Container>
		);
	}
}
