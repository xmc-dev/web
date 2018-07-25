import { h } from 'preact';
import { NavLink as StyledLink } from 'react-router-dom';
import Ionicon from 'react-ionicons';
import style from './style';

export function NavLink({ href, icon, text, bottom, exact, children, className }) {
	let id = '';
	if (bottom) {
		id = style.bottom;
	}

	let inner;
	if (children.length) {
		inner = children;
	} else {
		inner = <Ionicon icon={icon} fontSize="1.5em" color="white"/>;
	}

	return (
		<StyledLink exact={exact} activeClassName={style.active} to={href} id={id} className={className}>
			{inner}
			<span>{text}</span>
		</StyledLink>
	);
}

export function NavGroup({ children, bottom, extended }) {
	let id = '';
	if (bottom) {
		id = style.bottom;
	}
	const hi = extended ? style.extended : '';

	return (
		<div className={style.section + ' ' + hi} id={id}>
			{children}
		</div>
	);
}
