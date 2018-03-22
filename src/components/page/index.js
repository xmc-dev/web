import { h, Component } from 'preact';
import Helmet from 'preact-helmet';
import { Container } from 'semantic-ui-react';
import { XMCML } from '../../components/xmcml';
import { api, rawApi } from '../../lib/api';
import { getAttachmentContent } from '../../lib/api/attachment';
import JsxParser from 'react-jsx-parser';
import { ErrorMessage } from '../../components/error-message';
import { getPage } from '../../lib/api/page';

export class TestComponent extends Component {
	render() {
		return <h1>{this.props.foo} works!</h1>;
	}
}

export class Page extends Component {
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

	getContent(url) {
		if (url === '/') {
			url = '<root>';
		}
		getPage(url)
			.then(page => {
				this.setState({ page });
				return page.version;
			})
			.then(ver => {
				getAttachmentContent(ver.attachmentId)
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

	componentWillMount() {
		this.getContent(this.props.url);
	}

	componentWillReceiveProps(update) {
		this.setState({ error: null, url: update.url, content: '' });
		this.getContent(update.url);
	}

	render() {
		if (this.state.error) {
			return <ErrorMessage error={this.state.error.message} />;
		}
		return (
			<Container>
				<Helmet title={this.state.page.version.title} />
				<XMCML
					md={this.state.content || '# Loading...'}
					components={{ TestComponent }}
				/>
			</Container>
		);
	}
}
