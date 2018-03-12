import style from './style';
import { NavLink as StyledLink } from 'react-router-dom';
import Ionicon from 'react-ionicons';

export function NavLink({ href, icon, text, bottom, children }) {
	let id = '';
	if (bottom) {
		id = style.bottom;
	}

	let inner;
	if (children.length) {
		inner = this.props.children;
	} else {
		inner = <Ionicon icon={icon} fontSize="2em" color="white" />;
	}

	return (
		<StyledLink exact activeClassName={style.active} to={href} id={id}>
			{inner}
			<span>{text}</span>
		</StyledLink>
	);
}

export function NavGroup({ children, bottom }) {
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
