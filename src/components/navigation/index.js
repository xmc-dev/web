import { h, Component } from 'preact';
import { NavLink, NavGroup } from './nav';
import Hamburger from './hamburger';

import style from './style';
import logo from './logo.svg';
import { LoginButton } from './login-button';

export default class Navigation extends Component {
	constructor() {
		super();
		this.state = { hidden: true };
		this.hideNav = this.hideNav.bind(this);
	}

	hideNav() {
		this.setState({ hidden: !this.state.hidden });
	}

	render() {
		return (
			<nav id={style.navigation}>
				<Hamburger hideNav={this.hideNav} hidden={this.state.hidden} />
				<div id={style.logo}>
					<img src={logo} />
				</div>
				<NavGroup hidden={this.state.hidden}>
					<NavLink href="/" icon="ios-home-outline" text="HOME" />
					<NavLink href="/archive" icon="ios-filing-outline" text="ARCHIVE" />
					<NavLink
						href="/submissions"
						icon="ios-list-box-outline"
						text="MONITOR"
					/>
				</NavGroup>

				<NavGroup bottom>
					<LoginButton />
					<NavLink
						href="/settings"
						icon="ios-settings-outline"
						bottom
						text="SETTINGS"
					/>
				</NavGroup>
			</nav>
		);
	}
}
