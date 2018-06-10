import { h, Component } from 'preact';
import Helmet from 'preact-helmet';
import {
	Segment,
	Header,
	Container,
	Rail,
	Grid,
	List
} from 'semantic-ui-react';
import { XMCML } from '../../components/xmcml';
import { ErrorMessage } from '../../components/error-message';
import { TaskHeader } from './components/task-header';
import { TaskFooter } from './components/task-footer';
import { connect } from 'preact-redux';
import { readPageIfNeeded, readContentIfNeeded } from '../../actions/pages';
import { Link } from 'react-router-dom';

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
		props.getPage(props.url).then(() => {
			if (props.page.id) {
				props.getContent(props.page.id);
			}
		});
	}

	componentDidMount() {
		this.getContent(this.props);
	}

	componentWillReceiveProps(update) {
		if (
			update.page !== this.props.page ||
			update.version !== this.props.version
		) {
			this.getContent(update);
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
				<PageView content={this.props.content.content || ''} showWarnings/>
			</Container>
		);
	}
}

export const Page = connect(
	(state, props) => {
		const pageId = state.pages.ids[props.url] || props.url;
		const page = state.pages.byId[pageId] || {};
		const content = state.pages.contents[pageId] || {};
		return { pageId, page, version: page.version || {}, content };
	},
	dispatch => ({
		getPage: id => dispatch(readPageIfNeeded(id)),
		getContent: id => dispatch(readContentIfNeeded(id))
	})
)(ConnectedPage);
