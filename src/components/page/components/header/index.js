import { h } from 'preact';

export function Header(props) {
	return (
		<header class="luchian header">
			<div class="left">
				<strong class="title">{props.title}</strong>
				{ props.subtitle && <p class="subtitle">{props.subtitle}</p> }
			</div>
			{ props.right &&
				<div class="right">
					{props.right}
				</div>
			}
			{ props.children.length != 0 &&
				<div class="content">
					{props.children}
				</div>
			}
		</header>
	);
}