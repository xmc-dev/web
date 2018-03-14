import { Component } from 'preact';
import Ionicon from 'react-ionicons';

import style from './style';

export default class Hamburger extends Component {
	constructor(props) {
		super(props);
		this.toggleMenu = this.toggleMenu.bind(this);
	}

	toggleMenu() {
		this.props.hideNav();
	}

	render() {
		return (
			<div id={style.hamburger} onClick={this.toggleMenu}>
				<a>
					<Ionicon icon="ios-menu-outline" fontSize="2em" color="white" />
				</a>
			</div>
		);
	}
}
