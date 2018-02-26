import { h, Component } from 'preact';
import { Container, Header } from 'semantic-ui-react';
import Helmet from 'preact-helmet';
import style from './style';

export default class Home extends Component {
	render() {
		return (
			<Container className={style.home}>
				<Helmet title="XMC" />
				<Header as="h1">Home</Header>
				<p>This is the Home component.</p>
			</Container>
		);
	}
}
