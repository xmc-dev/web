import { h, Component } from "preact";
import { Link } from 'react-router-dom';
import { Card, Button, Form, Header } from 'semantic-ui-react';
import { getBase64 } from '../../../lib/file';

export class TaskFooter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			languages: [{
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
			}],
			file: null
		};
		this.onFormSubmit = this.onFormSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		//this.handleFileUpload = this.handleFileUpload.bind(this);
	}

	onFormSubmit(form) {
		form.preventDefault();
	}

	onChange(form) {
		this.setState({
			file: form.target.files[0]
		});
		getBase64(this.state.file).then(data => console.log(data));
	}

	render() {
		return (
			<Card fluid>
				<Card.Content>
					<Header>Incarca solutie</Header>
					<Form onSubmit={this.onFormSubmit}>
						<Form.Group inline>
							<span>Incarca solutie in&nbsp;&nbsp;</span>
							<strong><Form.Dropdown inline options={this.state.languages} default={this.state.languages[0].value} /></strong>
							<Form.Input type="file" onChange={this.onChange} />
						</Form.Group>
					</Form>
				</Card.Content>
				<Card.Content extra><Link to='/monitor'>Vezi solutii trimise</Link></Card.Content>
			</Card>
		);
	}
}