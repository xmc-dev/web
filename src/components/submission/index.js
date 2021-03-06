import { h, Component } from 'preact';
import { getShortStatus } from '../../lib/submission';
import { getAttachmentContent, getAttachment } from '../../lib/api/attachment';
import { ErrorMessage } from '../error-message';
import { InfoTable } from './info-table';
import { Container, Tab, Header as SHeader } from 'semantic-ui-react';
import { Header } from '../../components/page/components/header';
import { Code, CodeView } from '../code';
import { TestResultsTable } from './test-results-table';
import { connect } from 'preact-redux';
import { Text, withText } from 'preact-i18n';
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
			return (
				<ErrorMessage
					error={this.state.error.name}
					detail={this.state.error.message}
				/>
			);
		}
		if (this.state.isFetching) {
			return (
				<Container>
					<Header title="Loading"/>
				</Container>
			);
		}
		if (this.props.sub.censored) {
			return (
				<main>
					<Header title={<Text id="submission.evaluation-report"/>}>
						<InfoTable submission={this.props.sub} task={this.props.task}/>
					</Header>
				</main>
			);
		}

		const panes = [
			{
				menuItem: this.props.menuEvaluation,
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
				menuItem: this.props.menuCompilation,
				render: () => {
					if (this.props.sub.result) {
						return (
							<Tab.Pane>
								<SHeader as="h4">
									<Text id="submission.compilation.compilation-command"/>
								</SHeader>
								<Code code={this.props.sub.result.buildCommand}/>
								<SHeader as="h4">
									<Text id="submission.compilation.compiler-report"/>
								</SHeader>
								<Code code={this.props.sub.result.compilationMessage}/>
							</Tab.Pane>
						);
					}
				}
			},
			{
				menuItem: this.props.menuCode,
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
			<div>
				<Header title={<Text id="submission.evaluation-report"/>}>
					<InfoTable
						submission={this.props.sub}
						attachment={this.state.attachment}
						task={this.props.task}
						codeUrl={this.state.codeUrl}
					/>
				</Header>
				<Tab renderActiveOnly panes={panes}/>
			</div>
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
)(
	withText({
		menuEvaluation: 'submission.menu.evaluation',
		menuCompilation: 'submission.menu.compilation',
		menuCode: 'submission.menu.code'
	})(ConnectedSubmission)
);
