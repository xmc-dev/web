import { Component, h } from 'preact';
import Ionicon from 'react-ionicons';

export default class Hamburger extends Component {
	constructor(props) {
		super(props);
		this.toggleMenu = this.toggleMenu.bind(this);
	}

	toggleMenu() {
		this.props.hideNav();
	}

	render() {
		const icon = this.props.extended ? 'ios-close' : 'ios-menu-outline';
		return (
			<a class="hamburger" onClick={this.toggleMenu}>
				<Ionicon icon={icon} fontSize="1.5em" color="white"/>
			</a>
		);
	}
}
