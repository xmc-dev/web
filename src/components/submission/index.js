import { h, Component } from 'preact';
import { getShortStatus } from '../../lib/submission';
import { getAttachmentContent, getAttachment } from '../../lib/api/attachment';
import { ErrorMessage } from '../error-message';
import { InfoTable } from './info-table';
import { Container, Tab, Header } from 'semantic-ui-react';
import { Code, CodeView } from '../code';
import { TestResultsTable } from './test-results-table';
import { getTask } from '../../lib/api/task';
import { connect } from 'preact-redux';
import { readSubmission } from '../../actions/submissions';

class ConnectedSubmission extends Component {
	constructor(props) {
		super(props);
		this.state = {
			attachment: {},
			task: {},
			sourceCode: '',
			codeUrl: '',
			error: null
		};
	}

	getTask(sub) {
		getTask(sub.taskId)
			.then(task => {
				this.setState({ task });
			})
			.catch(() => {
				// Fallback
				this.setState({ task: { name: '' } });
			});
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
		/*
		GetSubmission(this.props.id, {
			includeResult: true,
			includeTestResults: true
		})
			.then(sub => {
				this.setState({ submission: sub });
				return sub;
			})
			.then(sub => {
				this.getTask(sub);
				this.getAttachment(sub);
				this.getSourceCodeFile(sub);
			})
			.catch(error => {
				this.setState({ error });
			});
			*/
	}

	componentWillReceiveProps(newProps) {
		const sub = newProps.sub;
		this.setState({ error: sub.error });
		if (!sub.error && !sub.isFetching) {
			this.getTask(sub);
			this.getAttachment(sub);
			this.getSourceCodeFile(sub);
		}
	}

	render() {
		if (this.state.error) {
			return <ErrorMessage error={this.state.error.message}/>;
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
					task={this.state.task}
					codeUrl={this.state.codeUrl}
				/>
				<Tab renderActiveOnly panes={panes}/>
			</Container>
		);
	}
}

export const Submission = connect(
	(state, ownProps) => ({ sub: state.submissions.byId[ownProps.id] || {} }),
	dispatch => ({
		getSubmission: id =>
			dispatch(
				readSubmission(id, { includeResult: true, includeTestResults: true })
			)
	})
)(ConnectedSubmission);
