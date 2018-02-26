import { h, Component } from 'preact';
import { getShortStatus } from '../../lib/submission';
import { api, rawApi } from '../../lib/api';
import { ErrorMessage } from '../error-message';
import { InfoTable } from './info-table';
import { Container, Tab, Header } from 'semantic-ui-react';
import { Code, CodeView } from '../code';
import { MonacoEditor } from 'react-monaco-editor';

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

	getAttachment(sub) {
		api('/attachments/' + sub.attachmentId)
			.then(data => {
				this.setState({ attachment: data.attachment });
			})
			.catch(error => {
				throw error;
			});

		api('/tasks/' + sub.taskId)
			.then(data => {
				this.setState({ task: data.task });
			})
			.catch(error => {
				throw error;
			});
	}

	getSourceCodeFile(sub) {
		api('/attachments/' + sub.attachmentId + '/file')
			.then(data => {
				this.setState({ codeUrl: data.url });
				fetch(data.url, { headers: { Origin: window.location.origin } })
					.then(data => {
						if (!data.ok) {
							throw new Error(data.statusText);
						}
						return data.text();
					})
					.then(code => {
						this.setState({ sourceCode: code });
					})
					.catch(error => {
						throw error;
					});
			})
			.catch(error => {
				throw error;
			});
	}

	componentDidMount() {
		api('/submissions/' + this.props.id + '?includeResult=true')
			.then(data => {
				this.setState({ submission: data.submission });
				return data.submission;
			})
			.then(sub => {
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
				render: () => (
					<Tab.Pane>
						<p>{getShortStatus(this.state.submission)}</p>
					</Tab.Pane>
				)
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
