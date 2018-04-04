import { h, Component } from 'preact';
import Helmet from 'preact-helmet';
import { Header, Container } from 'semantic-ui-react';
import { XMCML } from '../../components/xmcml';
import { getAttachmentContent } from '../../lib/api/attachment';
import { ErrorMessage } from '../../components/error-message';
import { TaskHeader } from './components/task-header';
import { TaskFooter } from './components/task-footer';
import { connect } from 'preact-redux';
import { readPageIfNeeded } from '../../actions/pages';

function TestComponent() {
	return <h1>Works!</h1>;
}

export function PageView({ content, showWarnings }) {
	return (
		<XMCML
			md={content}
			components={{
				TestComponent,
				TaskHeader,
				TaskFooter
			}}
			showWarnings={showWarnings}
		/>
	);
}

class ConnectedPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			content: ''
		};
		this.getContent = this.getContent.bind(this);
	}

	getContent(props) {
		if (props.version.attachmentId) {
			getAttachmentContent(props.version.attachmentId).then(att => {
				this.setState({ content: att.data });
			});
		}
	}

	componentDidMount() {
		this.props.getPage(this.props.url).then(() => this.getContent(this.props));
	}

	componentWillReceiveProps(update) {
		if (
			update.page !== this.props.page ||
			update.version !== this.props.version
		) {
			this.setState({ content: '' });
			update.getPage(update.url).then(() => this.getContent(update));
		}
	}

	render() {
		if (this.props.page.error) {
			return (
				<Container>
					<ErrorMessage error={this.props.page.error.message}/>
				</Container>
			);
		}
		if (this.props.page.isFetching) {
			return (
				<Container>
					<Header as="h1">Loading...</Header>
				</Container>
			);
		}
		return (
			<Container>
				<Helmet title={this.props.version.title}/>
				<PageView content={this.state.content} showWarnings/>
			</Container>
		);
	}
}

export const Page = connect(
	(state, props) => {
		const pageId = state.pages.ids[props.url] || props.url;
		const page = state.pages.byId[pageId] || {};
		return { pageId, page, version: page.version || {} };
	},
	dispatch => ({
		getPage: id => dispatch(readPageIfNeeded(id))
	})
)(ConnectedPage);
