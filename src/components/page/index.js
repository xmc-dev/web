import { h, Component } from 'preact';
import Helmet from 'preact-helmet';
import { Button, Header, Container } from 'semantic-ui-react';
import { XMCML } from '../xmcml';
import { ErrorMessage } from '../error-message';
import { TaskHeader } from './components/task-header';
import { TaskFooter } from './components/task-footer';
import { TaskListHeader } from './components/task-list-header';
import { TaskList } from './components/task-list';
import { Header as CHeader } from './components/header';
import { connect } from 'preact-redux';
import { readPageIfNeeded } from '../../actions/pages';
import { NavLink } from 'react-router-dom';
import { HasScope } from '../has-scope';

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
				TaskFooter,
				TaskList,
				TaskListHeader
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

	componentDidUpdate(oldProps) {
		if (this.props.url !== oldProps.url || this.props.page !== oldProps.page) {
			this.getContent(this.props);
		}
	}

	render() {
		if (this.props.page.error) {
			return (
				<Container>
					<ErrorMessage
						error={this.props.page.error.name}
						detail={this.props.page.error.message}
					/>
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
		let right;
		let objectId = this.props.page.objectId;
		if (objectId) {
			let object = objectId.split('/');
			if (object[0] === 'task_list') {
				right = <Button primary>Participate</Button>;
			} else if (object[0] === 'task') {
				right = <TaskHeader taskId={object[1]}/>;
			}
		}
		let title = (
			<span>
				{this.props.version.title}
				<HasScope scope="xmc.core/manage">
					<NavLink
						to={'/admin/pages/edit/' + this.props.page.id}
						className="luchian small-link"
					>
						Edit
					</NavLink>
				</HasScope>
			</span>
		);
		// Right = <div>{right}</div>;
		console.log(this.props.page);
		return (
			<main>
				<Helmet title={this.props.version.title}/>
				<CHeader title={title} right={right}/>
				<Container>
					<PageView content={this.props.version.contents || ''} showWarnings/>
				</Container>
			</main>
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
