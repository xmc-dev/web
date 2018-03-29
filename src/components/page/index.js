import { h, Component } from 'preact';
import Helmet from 'preact-helmet';
import { Container } from 'semantic-ui-react';
import { XMCML } from '../../components/xmcml';
import { getAttachmentContent } from '../../lib/api/attachment';
import { ErrorMessage } from '../../components/error-message';
import { getPage } from '../../lib/api/page';
import { TaskHeader } from './components/task-header';
import { TaskFooter } from './components/task-footer';

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
				return getAttachmentContent(page.version.attachmentId);
			})
			.then(att => {
				this.setState({ content: att.data });
			})
			.catch(error => {
				this.setState({ error });
			});
	}

	componentWillMount() {
		this.getContent(this.props.url);
	}

	componentWillReceiveProps(update) {
		this.setState({ error: null, content: '' });
		this.getContent(update.url);
	}

	render() {
		if (this.state.error) {
			return (
				<Container>
					<ErrorMessage error={this.state.error.message}/>
				</Container>
			);
		}
		return (
			<Container>
				<Helmet title={this.state.page.version.title}/>
				<XMCML
					md={this.state.content || '# Loading...'}
					components={{
						TestComponent,
						TaskHeader,
						TaskFooter
					}}
				/>
			</Container>
		);
	}
}
