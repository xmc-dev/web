// This is to make eslint shut up about the icons
/* eslint-disable camelcase */
import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';
import logo from './logo.svg';
import Icon from 'react-icons-kit';
import { basic_home } from 'react-icons-kit/linea/basic_home';
import { basic_archive_full } from 'react-icons-kit/linea/basic_archive_full';
import { arrows_hamburger1 } from 'react-icons-kit/linea/arrows_hamburger1';
import { basic_gear } from 'react-icons-kit/linea/basic_gear';
import { userOutline as user_outline } from 'react-icons-kit/typicons/userOutline';

function NavLink({ href, icon, text, bottom }) {
	let id = '';
	if (bottom) {
		id = style.bottom;
	}

	return (
		<Link activeClassName={style.active} href={href} id={id}>
			<Icon icon={icon} size={32} />
			<span>{text}</span>
		</Link>
	);
}

export default class Navigation extends Component {
	render() {
		return (
			<nav class={style.navigation}>
				<img src={logo} class={style.logo} />
				<NavLink href="/" icon={basic_home} text="HOME" />
				<NavLink href="/archive" icon={basic_archive_full} text="ARCHIVE" />
				<NavLink href="/submissions" icon={arrows_hamburger1} text="MONITOR" />

				<NavLink href="/login" icon={user_outline} text="LOGIN" />
				<NavLink href="/settings" icon={basic_gear} bottom text="SETTINGS" />
			</nav>
		);
	}
}
