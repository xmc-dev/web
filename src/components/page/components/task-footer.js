import { h, Component } from 'preact';
import { Link } from 'react-router-dom';
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
			file: null
		};
		this.onFormSubmit = this.onFormSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.handleFileUpload = this.handleFileUpload.bind(this);
	}

	onFormSubmit(form) {
		form.preventDefault();
		getBase64(this.state.file)
			.then(data => data.split(',').pop())
			.then(this.handleFileUpload);
	}

	onChange(form) {
		this.setState({
			file: form.target.files[0]
		});
	}

	handleFileUpload(data) {
		console.log(data);
	}

	render() {
		return (
			<div>
				<Message warning attached="top">
					<Icon name="warning" />
					Aceasta functie este momentan nefunctionala.
				</Message>
				<Segment attached>
					<Form onSubmit={this.onFormSubmit}>
						<Form.Group inline style={{ margin: 0 }}>
							Incarca solutie in
							<strong>
								<Form.Dropdown
									label=" "
									inline
									options={this.state.languages}
									defaultValue={this.state.languages[0].value}
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
					<Link to="/monitor">Vezi solutii trimise</Link>
				</Segment>
			</div>
		);
	}
}
