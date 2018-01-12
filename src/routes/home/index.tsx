import { h, Component } from 'preact';
const style = require('./style');

export default class Home extends Component<any, any> {
	render() {
		return (
			<div class={style.home}>
				<h1>Home</h1>
				<p>This is the Home component.</p>
			</div>
		);
	}
}
