import { Component, h } from 'preact';
import { ErrorMessage } from '../error-message';
import { Container, Pagination, Icon } from 'semantic-ui-react';

export class Paginate extends Component {
	constructor(props) {
		super(props);
		this.state = {
			items: [],
			error: null,
			meta: {},
			page: 1
		};
		this.handlePageChange = this.handlePageChange.bind(this);
	}

	componentDidMount() {
		this.handlePageChange(null, { activePage: 1 });
	}

	handlePageChange(e, { activePage }) {
		console.log(typeof this.props.getItems);
		this.setState({ page: activePage });
		this.props
			.getItems((activePage - 1) * this.state.meta.perPage)
			.then(data => {
				this.setState({ items: data.items, meta: data.meta });
			})
			.catch(error => {
				this.setState({ error });
			});
	}

	render() {
		if (this.state.error) {
			return <ErrorMessage error={this.state.error.message}/>;
		}
		return (
			<div>
				<this.props.component items={this.state.items}/>
				<Container fluid textAlign="center">
					<Pagination
						defaultActivePage={this.state.page}
						ellipsisItem={{
							content: <Icon name="ellipsis horizontal"/>,
							icon: true
						}}
						firstItem={{
							content: <Icon name="angle double left"/>,
							icon: true
						}}
						lastItem={{
							content: <Icon name="angle double right"/>,
							icon: true
						}}
						prevItem={{ content: <Icon name="angle left"/>, icon: true }}
						nextItem={{ content: <Icon name="angle right"/>, icon: true }}
						totalPages={Math.ceil(
							(this.state.meta.total || 1) / (this.state.meta.perPage || 1)
						)}
						onPageChange={this.handlePageChange}
					/>
				</Container>
			</div>
		);
	}
}
