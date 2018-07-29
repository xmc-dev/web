import { h } from 'preact';

export function TaskInfo(props) {
	return (
		<div className="luchian info group">
			{props.items.map(e => (
				<div key={e.value} className="item">
					<span className="label">{e.label}</span>
					{e.monospace ? (
						<code className="value">{e.value}</code>
					) : (
						<span className="value">{e.value}</span>
					)}
				</div>
			))}
		</div>
	);
}
