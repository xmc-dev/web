import { h } from 'preact';

export function Header(props) {
	return (
		<header className="luchian header">
			<div className="left">
				<strong className="title">{props.title}</strong>
				{props.subtitle && <p className="subtitle">{props.subtitle}</p>}
			</div>
			{props.right && <div className="right">{props.right}</div>}
			{props.children.length != 0 && (
				<div className="content">{props.children}</div>
			)}
		</header>
	);
}
