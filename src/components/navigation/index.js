// This is to make eslint shut up about the icons
/* eslint-disable camelcase */
import { h, Component } from 'preact';
import { NavLink, NavGroup } from './nav';
import Hamburger from './hamburger';

import style from './style';
import logo from './logo.svg';
import { LoginButton } from './login-button';

export default function Navigation() {
	return (
		<nav class={style.navigation}>
			<Hamburger />
			<div class={style.logo}>
				<img src={logo} />
			</div>
			<NavGroup>
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
