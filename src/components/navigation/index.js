import { h, Component } from 'preact';
import { NavLink, NavGroup } from './nav';
import Hamburger from './hamburger';
import { NavLink as StyledLink } from 'react-router-dom';
import { Text } from 'preact-i18n';

import logo from './logo.svg';
import { LoginButton } from './login-button';
import { HasScope } from '../has-scope';

export default class Navigation extends Component {
	constructor() {
		super();
		this.state = { extended: false };
		this.toggleNav = this.toggleNav.bind(this);
		this.hideNav = this.hideNav.bind(this);
	}

	toggleNav() {
		this.setState(prevState => ({ extended: !prevState.extended }));
	}

	hideNav() {
		this.setState({ extended: false });
	}

	render() {
		return (
			<nav
				className={"luchian navigation" + (this.state.extended ? " extended" : '')}
			>
				<Hamburger hideNav={this.toggleNav} extended={this.state.extended}/>
				<StyledLink to="/" className="logo">
					<img src={logo}/>
				</StyledLink>
				<NavGroup extended={this.state.extended}>
					<NavLink
						exact
						href="/"
						icon="ios-home-outline"
						text={<Text id="nav.home"/>}
						onClick={this.hideNav}
					/>
					<NavLink
						href="/archive"
						icon="ios-filing-outline"
						text={<Text id="nav.archive"/>}
						onClick={this.hideNav}
					/>
					<NavLink
						href="/rounds"
						icon="ios-medal-outline"
						text={<Text id="nav.rounds"/>}
						onClick={this.hideNav}
					/>
					<NavLink
						href="/submissions"
						icon="ios-list-box-outline"
						text={<Text id="nav.monitor"/>}
						onClick={this.hideNav}
					/>
					<HasScope scope="xmc.core/manage">
						<NavLink
							href="/admin"
							icon="ios-build-outline"
							text={<Text id="nav.admin"/>}
							onClick={this.hideNav}
						/>
					</HasScope>
				</NavGroup>

				<NavGroup bottom>
					<LoginButton/>
					<NavLink
						exact
						href="/settings"
						icon="ios-settings-outline"
						bottom
						text={<Text id="nav.settings"/>}
						onClick={this.hideNav}
					/>
				</NavGroup>
			</nav>
		);
	}
}
