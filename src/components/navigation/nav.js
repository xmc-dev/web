import { h } from 'preact';
import { NavLink as StyledLink } from 'react-router-dom';
import Ionicon from 'react-ionicons';
import style from './style';

export function NavLink({ href, icon, text, bottom, exact, children }) {
	let id = '';
	if (bottom) {
		id = style.bottom;
	}

	let inner;
	if (children.length) {
		inner = children;
	} else {
		inner = <Ionicon icon={icon} fontSize="2em" color="white"/>;
	}

	return (
		<StyledLink exact={exact} activeClassName={style.active} to={href} id={id}>
			{inner}
			<span>{text}</span>
		</StyledLink>
	);
}

export function NavGroup({ children, bottom, hidden }) {
	let id = '';
	if (bottom) {
		id = style.bottom;
	}
	const hi = hidden ? style.hidden : '';

	return (
		<div className={style.section + ' ' + hi} id={id}>
			{children}
		</div>
	);
}
