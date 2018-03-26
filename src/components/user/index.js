import { h, Component } from 'preact';
import { getAccount } from '../../lib/api/account';
import { ErrorMessage } from '../error-message';
import { Container, Button, Header } from 'semantic-ui-react';
import { connect } from 'preact-redux';
import { Redirect } from 'react-router-dom';

export class User extends Component {
	constructor(props) {
		super(props);
		this.state = { account: {}, error: null, logout: false };
		this.logout = this.logout.bind(this);
	}

	componentDidMount() {
		getAccount(this.props.id)
			.then(account => {
				this.setState({ account });
				this.props.setClientId(account.clientId);
			})
			.catch(error => this.setState({ error }));
	}

	logout() {
		this.setState({ logout: true });
	}

	render() {
		if (this.state.error) {
			return <ErrorMessage error={this.state.error.message} />;
		}
		if (this.state.logout) {
			return <Redirect to="/logout" />;
		}

		const acc = this.state.account;
		return (
			<Container>
				<Header as="h1">{acc.name}</Header>
				<Button onClick={this.logout}>Logout</Button>
			</Container>
		);
	}
}
