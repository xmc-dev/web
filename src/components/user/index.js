import { h, Component } from 'preact';
import { getAccount } from '../../lib/api/account';
import { ErrorMessage } from '../error-message';
import { Button } from 'semantic-ui-react';
import { Header } from '../../components/page/components/header';
import { Redirect } from 'react-router-dom';
import { Text } from 'preact-i18n';

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
			})
			.catch(error => this.setState({ error }));
	}

	logout() {
		this.setState({ logout: true });
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
		if (this.state.logout) {
			return <Redirect to="/logout"/>;
		}

		const acc = this.state.account.account || {};
		const role = this.state.account.role || {};
		return (
			<Header
				title={acc.name}
				subtitle={role.name}
				right={
					<Button primary onClick={this.logout}>
						<Text id="user.logout"/>
					</Button>
				}
			/>
		);
	}
}
