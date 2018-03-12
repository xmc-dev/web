// This is to make eslint shut up about the icons
/* eslint-disable camelcase */
import { h, Component } from 'preact';
import { NavLink as StyledLink } from 'react-router-dom';
import style from './style';
import logo from './logo.svg';
import Ionicon from 'react-ionicons';

function NavLink({ href, icon, text, bottom }) {
	let id = '';
	if (bottom) {
		id = style.bottom;
	}

	return (
		<StyledLink exact activeClassName={style.active} to={href} id={id}>
			<Ionicon icon={icon} fontSize="2em" color="white" />
			<span>{text}</span>
		</StyledLink>
	);
}

function NavGroup({ children, bottom }) {
	let id = style.middle;
	if (bottom) {
		id = style.bottom;
	}

	return (
		<div class={style.section} id={id}>
			{children}
		</div>
	);
}

export default function Navigation() {
	return (
		<nav class={style.navigation}>
			<img src={logo} class={style.logo} />
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
				<NavLink href="/login" icon="ios-person-outline" text="LOGIN" />
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
