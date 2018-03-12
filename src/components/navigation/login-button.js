import { Component } from 'preact';
import { getTokenString, setNavUpdater } from '../../lib/auth';
import { NavLink } from './nav';
import { api } from '../../lib/api';

export class LoginButton extends Component {
	constructor() {
		super();
		this.state = { account: null };
		this.getAccount = this.getAccount.bind(this);
		setNavUpdater(this.getAccount);
	}

	getAccount() {
		if (getTokenString()) {
			api('/accounts/').then(data => {
				this.setState({ account: data });
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
