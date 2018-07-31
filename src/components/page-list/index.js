import { h, Component } from 'preact';
import { Button, Table, Icon, Container } from 'semantic-ui-react';
import { ErrorMessage } from '../error-message';
import { getPage, getFirstChildren } from '../../lib/api/page';
import { Redirect, Link } from 'react-router-dom';
import { Text } from 'preact-i18n';
import { stringDate } from '../../lib/date';
import { Header } from '../page/components/header';

function PageListRow({ page, header } = { page: {}, header: false }) {
	const Comp = header ? Table.HeaderCell : Table.Cell;
	const pathLink = header ? (
		page.path
	) : (
		<Link to={`/admin/pages/list${page.path}`}>{page.path}</Link>
	);
	const path = page.path === '/' ? '/<root>' : page.path;

	return (
		<Table.Row>
			<Comp width={4}>
				<Icon name="file outline"/>
				{pathLink}
			</Comp>
			<Comp width={5}>{page.version && page.version.title}</Comp>
			<Comp width={4}>
				<Link to={`/admin/pages/edit${path}`}>
					<Text id="admin.pages.modify-page"/>
				</Link>
			</Comp>
			<Comp width={3} textAlign="right">
				{stringDate(page.latestTimestamp)}
			</Comp>
		</Table.Row>
	);
}

export class PageList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			page: {},
			children: [],
			error: null,
			goToNew: false
		};
		this.updateContent = this.updateContent.bind(this);
	}

	updateContent() {
		this.setState({ error: null });
		getPage(this.props.id, { raw: true })
			.then(page => {
				this.setState({ page });
				return getFirstChildren(page.id);
			})
			.then(children => this.setState({ children }))
			.catch(error => this.setState({ error }));
	}

	componentDidMount() {
		this.updateContent();
	}

	componentDidUpdate(oldProps) {
		if (this.props.id !== oldProps.id) {
			this.updateContent();
		}
	}

	back(path) {
		if (!path) {
			return '';
		}
		const p = path.split('/');
		return p.slice(0, p.length - 1).join('/');
	}

	render() {
		if (this.state.error) {
			return (
				<ErrorMessage
					error={this.state.error.name}
					detail={this.state.error.message}
				/>
			);
		}
		const rows = this.state.children.map(child => (
			<PageListRow key={child.id} page={child}/>
		));
		const back =
			this.state.page.path === '/' ? null : (
				<Table.Row>
					<Table.Cell colSpan={3}>
						<Icon name="reply"/>
						<Link to={`/admin/pages/list${this.back(this.state.page.path)}`}>
							..
						</Link>
					</Table.Cell>
				</Table.Row>
			);
		const redir = this.state.goToNew ? (
			<Redirect push to="/admin/pages/new"/>
		) : null;
		return (
			<div>
				{redir}
				<Header
					title={<Text id="admin.pages.title"/>}
					subtitle={<Text id="admin.pages.subtitle"/>}
				/>
				<Container>
					<Table fixed>
						<Table.Header>
							<PageListRow page={this.state.page} header/>
						</Table.Header>
						<Table.Body>
							{back}
							{rows}
						</Table.Body>
					</Table>
					<Button onClick={() => this.setState({ goToNew: true })}>
						<Text id="admin.pages.new-page"/>
					</Button>
				</Container>
			</div>
		);
	}
}
