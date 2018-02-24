import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';
import logo from './logo.svg';
import Icon from 'react-icons-kit';
import { basic_home, basic_archive_full, arrows_hamburger1, basic_gear } from 'react-icons-kit/linea';

export default class Navigation extends Component {
	render() {
		return (
			<nav class={style.navigation}>
				<img src={logo} class={style.logo} />
				<Link activeClassName={style.active} href="/"><Icon icon={basic_home} size={32} /><span>HOME</span></Link>
				<Link activeClassName={style.active} href="/archive"><Icon icon={basic_archive_full} size={32} /><span>ARCHIVE</span></Link>
				<Link activeClassName={style.active} href="/submissions"><Icon icon={arrows_hamburger1} size={32} /><span>MONITOR</span></Link>
				<Link activeClassName={style.active} href="/settings" id={style.bottom}><Icon icon={basic_gear} size={32} /><span>SETTINGS</span></Link>
			</nav>
		);
	}
}