import { h, Component } from 'preact';
import { getShortStatus } from '../../lib/submission';
import { getAttachmentContent, getAttachment } from '../../lib/api/attachment';
import { ErrorMessage } from '../error-message';
import { InfoTable } from './info-table';
import { Container, Tab, Header } from 'semantic-ui-react';
import { Code, CodeView } from '../code';
import { TestResultsTable } from './test-results-table';
import { connect } from 'preact-redux';
import { readSubmission } from '../../actions/submissions';
import { readTaskIfNeeded } from '../../actions/tasks';

class ConnectedSubmission extends Component {
	constructor(props) {
		super(props);
		this.state = {
			attachment: {},
			sourceCode: '',
			codeUrl: '',
			isFetching: true,
			error: null
		};
	}

	getAttachment(sub) {
		getAttachment(sub.attachmentId)
			.then(att => {
				this.setState({ attachment: att });
			})
			.catch(err => {
				throw err;
			});
	}

	getSourceCodeFile(sub) {
		getAttachmentContent(sub.attachmentId)
			.then(att => {
				this.setState({ codeUrl: att.url, sourceCode: att.data });
			})
			.catch(error => {
				throw error;
			});
	}

	componentDidMount() {
		this.props.getSubmission(this.props.id);
	}

	componentDidUpdate(oldProps) {
		if (this.props.sub === oldProps.sub) {
			return;
		}
		const sub = this.props.sub;
		/* eslint-disable react/no-did-update-set-state */
		this.setState({ error: sub.error });
		this.setState({ isFetching: sub.isFetching });
		/* eslint-enable react/no-did-update-set-state */
		if (!sub.error && !sub.isFetching) {
			this.props.getTask(sub.taskId);
			if (!sub.censored) {
				this.getAttachment(sub);
				this.getSourceCodeFile(sub);
			}
		}
	}

	render() {
		if (this.state.error) {
			return <ErrorMessage error={this.state.error.message}/>;
		}
		if (this.state.isFetching) {
			return (
				<Container>
					<Header as="h1">Loading</Header>
				</Container>
			);
		}
		if (this.props.sub.censored) {
			return (
				<Container fluid>
					<Header as="h1">Raport de evaluare</Header>
					<InfoTable submission={this.props.sub} task={this.props.task}/>
				</Container>
			);
		}
		const panes = [
			{
				menuItem: 'Evaluare',
				render: () => {
					let table;
					if (this.props.sub.result) {
						table = (
							<TestResultsTable
								testResults={this.props.sub.result.testResults}
								finalScore={this.props.sub.result.score}
							/>
						);
					}
					return (
						<Tab.Pane>
							<p>{getShortStatus(this.props.sub)}</p>
							{table}
						</Tab.Pane>
					);
				}
			},
			{
				menuItem: 'Compilare',
				render: () => {
					if (this.props.sub.result) {
						return (
							<Tab.Pane>
								<Header as="h4">Comanda de compilare</Header>
								<Code code={this.props.sub.result.buildCommand}/>
								<Header as="h4">Raport compilator</Header>
								<Code code={this.props.sub.result.compilationMessage}/>
							</Tab.Pane>
						);
					}
				}
			},
			{
				menuItem: 'Cod',
				render: () => (
					<Tab.Pane>
						<CodeView
							code={this.state.sourceCode}
							language={this.props.sub.language}
						/>
					</Tab.Pane>
				)
			}
		];
		return (
			<Container fluid>
				<Header as="h1">Raport de evaluare</Header>
				<InfoTable
					submission={this.props.sub}
					attachment={this.state.attachment}
					task={this.props.task}
					codeUrl={this.state.codeUrl}
				/>
				<Tab renderActiveOnly panes={panes}/>
			</Container>
		);
	}
}

export const Submission = connect(
	(state, ownProps) => {
		const ret = { sub: state.submissions.byId[ownProps.id] || {} };
		ret.task = state.tasks.byId[ret.sub.taskId] || {};
		return ret;
	},
	dispatch => ({
		getSubmission: id =>
			dispatch(
				readSubmission(id, {
					includeResult: true,
					includeTestResults: true
				})
			),
		getTask: id => dispatch(readTaskIfNeeded(id))
	})
)(ConnectedSubmission);
