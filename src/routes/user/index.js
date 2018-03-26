import { Component } from 'preact';
import { Container } from 'semantic-ui-react';
import { User as CUser } from '../../components/user';
import { Helmet } from 'preact-helmet';

export default class User extends Component {
	constructor(props) {
		super(props);
		this.state = { clientId: '' };
		this.setClientId = this.setClientId.bind(this);
	}

	setClientId(id) {
		this.setState({ clientId: id });
	}

	render() {
		return (
			<Container>
				<Helmet title="Profile" />
				<CUser setClientId={this.setClientId} id={this.props.match.params.id} />
			</Container>
		);
	}
}
