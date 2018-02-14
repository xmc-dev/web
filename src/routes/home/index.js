import { h, Component } from 'preact';
import { Container, Header } from 'semantic-ui-react';
import style from './style';

export default class Home extends Component {
	render() {
		return (
			<Container className={style.home}>
				<Header as='h1'>Home</Header>
				<p>This is the Home component.</p>
			</Container>
		);
	}
}
