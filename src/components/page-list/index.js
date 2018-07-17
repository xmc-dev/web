import { h, Component } from 'preact';
import { Table, Icon } from 'semantic-ui-react';
import { getPage, getFirstChildren } from '../../lib/api/page';
import { Link } from 'react-router-dom';
import { stringDate } from '../../lib/date';

function PageListRow({ page, header } = { page: {}, header: false }) {
	const Comp = header ? Table.HeaderCell : Table.Cell;
	const pathLink = header ? (
		page.path
	) : (
		<Link to={`/admin/pages${page.path}`}>{page.path}</Link>
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
				<Link to={`/admin/pages${path}/edit`}>Modify Page</Link>
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
			error: {}
		};
		this.updateContent = this.updateContent.bind(this);
	}

	updateContent() {
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
		const rows = this.state.children.map(child => (
			<PageListRow key={child.id} page={child}/>
		));
		const back =
			this.state.page.path === '/' ? null : (
				<Table.Row>
					<Table.Cell colSpan={3}>
						<Icon name="reply"/>
						<Link to={`/admin/pages${this.back(this.state.page.path)}`}>
							..
						</Link>
					</Table.Cell>
				</Table.Row>
			);
		return (
			<div>
				<Table fixed>
					<Table.Header>
						<PageListRow page={this.state.page} header/>
					</Table.Header>
					<Table.Body>
						{back}
						{rows}
					</Table.Body>
				</Table>
			</div>
		);
	}
}
