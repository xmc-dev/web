import { Component } from 'preact';
import { Table, Container, Pagination, Icon } from 'semantic-ui-react';
import { ErrorMessage } from '../error-message';
import { SubmissionMonitorRow, SubmissionMonitorHeaderRow } from './row';
import { api } from '../../lib/api';
import { getSubmissions } from '../../lib/api/submission';

export class SubmissionMonitor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			submissions: [],
			error: null,
			meta: {},
			page: 1
		};
		this.handlePageChange = this.handlePageChange.bind(this);
	}

	componentDidMount() {
		getSubmissions({ includeResult: true, taskId: this.props.taskId || '' })
			.then(data => {
				const submissions = data.submissions.map(sub => {
					return <SubmissionMonitorRow sub={sub} />;
				});
				this.setState({ submissions, meta: data.meta });
			})
			.catch(error => {
				this.setState({ error });
			});
	}

	handlePageChange(e, { activePage }) {
		this.setState({ page: activePage });
		getSubmissions({
			offset: (activePage - 1) * this.state.meta.perPage,
			includeResult: true,
			taskId: this.props.taskId || ''
		})
			.then(data => {
				const submissions = data.submissions.map(sub => {
					return <SubmissionMonitorRow sub={sub} />;
				});
				this.setState({ submissions, meta: data.meta });
			})
			.catch(error => {
				this.setState({ error });
			});
	}

	render() {
		if (this.state.error) {
			return <ErrorMessage error={this.state.error.message} />;
		}
		return (
			<div>
				<Table celled striped selectable>
					<Table.Header>
						<SubmissionMonitorHeaderRow />
					</Table.Header>
					<Table.Body>{this.state.submissions}</Table.Body>
				</Table>
				<Container fluid textAlign="center">
					<Pagination
						defaultActivePage={this.state.page}
						ellipsisItem={{
							content: <Icon name="ellipsis horizontal" />,
							icon: true
						}}
						firstItem={{
							content: <Icon name="angle double left" />,
							icon: true
						}}
						lastItem={{
							content: <Icon name="angle double right" />,
							icon: true
						}}
						prevItem={{ content: <Icon name="angle left" />, icon: true }}
						nextItem={{ content: <Icon name="angle right" />, icon: true }}
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
