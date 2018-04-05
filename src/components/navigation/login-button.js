import { Component, h } from 'preact';
import { getTokenString } from '../../lib/auth';
import { NavLink } from './nav';
import { getAccount } from '../../lib/api/account';
import { connect } from 'preact-redux';
import { withRouter } from 'react-router-dom';

class ConnectedLoginButton extends Component {
	constructor(props) {
		super(props);
		this.state = { account: null };
		this.getAccount = this.getAccount.bind(this);
	}

	componentWillReceiveProps(props) {
		if (props.token !== this.props.token) {
			this.getAccount();
		}
	}

	getAccount() {
		if (getTokenString()) {
			getAccount().then(account => {
				this.setState({ account: account.account });
			});
		}
	}

	componentDidMount() {
		this.getAccount();
	}

	render() {
		if (this.state.account) {
			return (
				<NavLink
					exact
					href="/user"
					icon="ios-person-outline"
					text={this.state.account.name}
				/>
			);
		}
		return (
			<NavLink exact href="/login" icon="ios-person-outline" text="LOGIN"/>
		);
	}
}

export const LoginButton = withRouter(
	connect(state => {
		return {
			token: state.auth.token.access_token
		};
	})(ConnectedLoginButton)
);
