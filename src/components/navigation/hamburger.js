import { Component, h } from 'preact';
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
		const icon = this.props.hidden ? 'ios-menu-outline' : 'ios-close';
		return (
			<div id={style.hamburger} onClick={this.toggleMenu}>
				<a>
					<Ionicon icon={icon} fontSize="2em" color="white"/>
				</a>
			</div>
		);
	}
}
