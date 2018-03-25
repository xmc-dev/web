import { Component } from 'preact';
import { getTokenString, setNavUpdater } from '../../lib/auth';
import { NavLink } from './nav';
import { api } from '../../lib/api';
import { getAccount } from '../../lib/api/account';
import { connect } from 'preact-redux';

class ConnectedLoginButton extends Component {
	constructor(props) {
		super(props);
		this.state = { account: null };
		this.getAccount = this.getAccount.bind(this);
	}

	componentWillReceiveProps(props) {
		if (props.token != this.props.token) {
			console.log(props.token);
			this.getAccount();
		}
	}

	getAccount() {
		if (getTokenString()) {
			getAccount().then(account => {
				this.setState({ account });
			});
		}
	}

	componentDidMount() {
		this.getAccount();
	}

	render() {
		let text = 'LOGIN';
		let href = '/login';
		if (this.state.account) {
			text = this.state.account.name;
			href = '/user';
		}
		return <NavLink href={href} icon="ios-person-outline" text={text} />;
	}
}

export const LoginButton = connect(state => {
	return {
		token: state.auth.token.access_token
	}
})(ConnectedLoginButton);