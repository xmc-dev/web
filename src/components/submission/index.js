import { h, Component } from 'preact';
import { getShortStatus } from '../../lib/submission';
import { api } from '../../lib/api';
import { getAttachmentContent, getAttachment } from '../../lib/api/attachment';
import { ErrorMessage } from '../error-message';
import { InfoTable } from './info-table';
import { Container, Tab, Header } from 'semantic-ui-react';
import { Code, CodeView } from '../code';
import { MonacoEditor } from 'react-monaco-editor';
import { TestResultsTable } from './test-results-table';
import { getSubmission } from '../../lib/api/submission';

export class Submission extends Component {
	constructor(props) {
		super(props);
		this.state = {
			submission: {},
			attachment: {},
			task: {},
			sourceCode: '',
			codeUrl: '',
			error: null
		};
	}

	getTask(sub) {
		api('/tasks/' + sub.taskId)
			.then(data => {
				this.setState({ task: data.task });
			})
			.catch(error => {
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
		getSubmission(this.props.id, {
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
	}

	render() {
		if (this.state.error) {
			return <ErrorMessage error={this.state.error.message} />;
		}
		const panes = [
			{
				menuItem: 'Evaluare',
				render: () => {
					let table;
					if (this.state.submission.result) {
						table = (
							<TestResultsTable
								testResults={this.state.submission.result.testResults}
								finalScore={this.state.submission.result.score}
							/>
						);
					}
					return (
						<Tab.Pane>
							<p>{getShortStatus(this.state.submission)}</p>
							{table}
						</Tab.Pane>
					);
				}
			},
			{
				menuItem: 'Compilare',
				render: () => {
					if (this.state.submission.result) {
						return (
							<Tab.Pane>
								<Header as="h4">Comanda de compilare</Header>
								<Code code={this.state.submission.result.buildCommand} />
								<Header as="h4">Raport compilator</Header>
								<Code code={this.state.submission.result.compilationMessage} />
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
							language={this.state.submission.language}
						/>
					</Tab.Pane>
				)
			}
		];
		return (
			<Container fluid>
				<Header as="h1">Raport de evaluare</Header>
				<InfoTable
					submission={this.state.submission}
					attachment={this.state.attachment}
					task={this.state.task}
					codeUrl={this.state.codeUrl}
				/>
				<Tab renderActiveOnly panes={panes} />
			</Container>
		);
	}
}
