import { h } from 'preact';
import { NavLink as StyledLink } from 'react-router-dom';
import Ionicon from 'react-ionicons';

export function NavLink({
	href,
	icon,
	text,
	bottom,
	exact,
	children,
	className,
	onClick
}) {
	if (bottom) {
		className += " bottom";
	}

	let inner;
	if (children.length) {
		inner = children;
	} else {
		inner = <Ionicon icon={icon} fontSize="1.5em" color="white"/>;
	}

	return (
		<div onClick={onClick}>
			<StyledLink
				exact={exact}
				activeClassName="active"
				to={href}
				className={className}
			>
				{inner}
				<span>{text}</span>
			</StyledLink>
		</div>
	);
}

export function NavGroup({ children, bottom, extended }) {
	let className = "section";
	if (bottom) {
		className += " bottom";
	}
	if (extended) {
		className += " extended";
	}

	return (
		<div className={className}>
			{children}
		</div>
	);
}
