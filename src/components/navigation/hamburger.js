import { Component } from 'preact';
import Ionicon from 'react-ionicons';

import style from './style';

export default class Hamburger extends Component {
	constructor() {
		super();
		this.toggleMenu = this.toggleMenu.bind(this);
	}

	toggleMenu() {
		console.log('nope');
	}

	render() {
		return (
			<div class={style.hamburger} onClick={this.toggleMenu}>
				<a>
					<Ionicon icon="ios-menu-outline" fontSize="2em" color="white" />
				</a>
			</div>
		);
	}
}
