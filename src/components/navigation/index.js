// This is to make eslint shut up about the icons
/* eslint-disable camelcase */
import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';
import logo from './logo.svg';
import Ionicon from 'react-ionicons'

function NavLink({ href, icon, text, bottom }) {
	let id = '';
	if (bottom) {
		id = style.bottom;
	}

	return (
		<Link activeClassName={style.active} href={href} id={id}>
			<Ionicon icon={icon} fontSize={32} color="white"/>
			<span>{text}</span>
		</Link>
	);
}

export default class Navigation extends Component {
	render() {
		return (
			<nav class={style.navigation}>
				<img src={logo} class={style.logo} />
				<div class={style.section} id={style.middle}>
					<NavLink href="/" icon="ios-home-outline" text="HOME" />
					<NavLink href="/archive" icon="ios-filing-outline" text="ARCHIVE" />
					<NavLink href="/submissions" icon="ios-list-box-outline" text="MONITOR" />
				</div>

				<div class={style.section} id={style.bottom}>
					<NavLink href="/login" icon="ios-person-outline" text="LOGIN" />
					<NavLink href="/settings" icon="ios-settings-outline" bottom text="SETTINGS" />
				</div>
			</nav>
		);
	}
}
