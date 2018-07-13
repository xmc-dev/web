import { h, Component } from 'preact';
import Helmet from 'preact-helmet';
import { Header, Container } from 'semantic-ui-react';
import { XMCML } from '../../components/xmcml';
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
		this.getContent = this.getContent.bind(this);
	}

	getContent(props) {
		props.getPage(props.url);
	}

	componentDidMount() {
		this.getContent(this.props);
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
		let urlPath;
		if (this.props.page.path) {
			urlPath = this.props.page.path.substr(1);
		}
		if (!urlPath) {
			urlPath = '<root>';
		}
		return (
			<Container>
				<Helmet title={this.props.version.title}/>
				<PageView content={this.props.version.contents || ''} showWarnings/>
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
