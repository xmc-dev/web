import { h, Component } from 'preact';
import { NavLink, NavGroup } from './nav';
import Hamburger from './hamburger';
import { NavLink as StyledLink } from 'react-router-dom';

import style from './style';
import logo from './logo.svg';
import { LoginButton } from './login-button';
import { HasScope } from '../has-scope';

export default class Navigation extends Component {
	constructor() {
		super();
		this.state = { extended: false };
		this.hideNav = this.hideNav.bind(this);
	}

	hideNav() {
		this.setState(prevState => ({ extended: !prevState.extended }));
	}

	render() {
		return (
			<nav id={style.navigation} class={this.state.extended ? style.extended : ""}>
				<Hamburger hideNav={this.hideNav} extended={this.state.extended}/>
				<StyledLink to="/" id={style.logo}>
					<img src={logo}/>
				</StyledLink>
				<NavGroup extended={this.state.extended}>
					<NavLink exact href="/" icon="ios-home-outline" text="Home"/>
					<NavLink href="/archive" icon="ios-filing-outline" text="Archive"/>
					<NavLink href="/rounds" icon="ios-medal-outline" text="Rounds"/>
					<NavLink
						href="/submissions"
						icon="ios-list-box-outline"
						text="Monitor"
					/>
					<HasScope scope="xmc.core/manage">
						<NavLink href="/admin" icon="ios-build-outline" text="Admin"/>
					</HasScope>
				</NavGroup>

				<NavGroup bottom>
					<LoginButton/>
					<NavLink
						exact
						href="/settings"
						icon="ios-settings-outline"
						bottom
						text="Settings"
					/>
				</NavGroup>
			</nav>
		);
	}
}
