import { h } from 'preact';

export function TaskInfo(props) {
	return (
		<div class="luchian info group">
			{
				props.items.map(e => 
					<div class="item">
						<span class="label">{e.label}</span>
						{e.monospace ? (
							<code class="value">{e.value}</code>
						) : (
							<span class="value">{e.value}</span>
						)}
					</div>
				)
			}
		</div>
	);
}