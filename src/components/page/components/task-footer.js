import { h, Component } from 'preact';
import { Link, Redirect } from 'react-router-dom';
import {
	Segment,
	Button,
	Form,
	Header,
	Divider,
	Message,
	Icon
} from 'semantic-ui-react';
import { getBase64 } from '../../../lib/file';
import { createSubmission } from '../../../lib/api/submission';

export class TaskFooter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			languages: [
				{
					key: 'go',
					text: 'Go',
					value: 'go',
					content: 'Go'
				},
				{
					key: 'c',
					text: 'C',
					value: 'c',
					content: 'C'
				},
				{
					key: 'cpp',
					text: 'C++',
					value: 'cpp',
					content: 'C++'
				}
			],
			file: null,
			warning: { head: '', body: '', show: false },
			currentLanguage: 'go',
			redirectTo: ''
		};
		this.onFormSubmit = this.onFormSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.handleFileUpload = this.handleFileUpload.bind(this);
		this.detectFileType = this.detectFileType.bind(this);
	}

	onFormSubmit(form) {
		form.preventDefault();
		this.setState({ warning: { show: false } });
		if (!this.state.file) {
			this.setState({
				warning: {
					head: 'Select a file to submit first!',
					show: true
				}
			});
		}
		getBase64(this.state.file)
			.then(data => data.split(',').pop())
			.then(this.handleFileUpload);
	}

	detectFileType(file) {
		const s = file.name.split('.');
		const ext = s[s.length - 1].toLowerCase();
		const val = this.state.languages.find(el => el.key === ext);
		if (val) {
			this.setState({ currentLanguage: val.key });
		} else {
			this.setState({
				warning: {
					head: 'Couldn\'t auto select a compiler for the selected file!',
					body: 'Make sure that you selected the correct file.',
					show: true
				}
			});
		}
	}

	onChange(form) {
		const file = form.target.files[0];
		this.setState({ warning: { show: false } });
		this.detectFileType(file);
		this.setState({ file });
	}

	handleFileUpload(data) {
		createSubmission({
			taskId: this.props.taskId,
			language: this.state.currentLanguage,
			code: data
		})
			.then(() =>
				this.setState({
					redirectTo: '/submissions?taskId=' + this.props.taskId
				})
			)
			.catch(error => {
				this.setState({
					warning: {
						head: error.message,
						show: true
					}
				});
			});
	}

	render() {
		if (this.state.redirectTo) {
			return <Redirect to={this.state.redirectTo} />;
		}
		return (
			<div>
				<Message icon hidden={!this.state.warning.show} warning attached="top">
					<Icon name="warning" />
					<Message.Content>
						<Message.Header>{this.state.warning.head}</Message.Header>
						{this.state.warning.body}
					</Message.Content>
				</Message>
				<Segment attached={this.state.warning.show ? true : 'top'}>
					<Form onSubmit={this.onFormSubmit}>
						<Form.Group inline style={{ margin: 0 }}>
							Incarca solutie in
							<strong>
								<Form.Dropdown
									label=" "
									inline
									options={this.state.languages}
									value={this.state.currentLanguage}
									onChange={(ev, data) =>
										this.setState({ currentLanguage: data.value })
									}
								/>
							</strong>
							<Form.Input transparent type="file" onChange={this.onChange} />
							<Button
								basic
								positive
								type="submit"
								style={{ position: 'absolute', right: 0 }}
							>
								Trimite
							</Button>
						</Form.Group>
					</Form>
				</Segment>
				<Segment attached="bottom">
					<Link to={'/submissions?taskId=' + this.props.taskId}>
						Vezi solutii trimise
					</Link>
				</Segment>
			</div>
		);
	}
}
