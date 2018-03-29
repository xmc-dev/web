import { Component, h } from 'preact';
import { Container } from 'semantic-ui-react';
import { User as CUser } from '../../components/user';
import { Helmet } from 'preact-helmet';

export default class User extends Component {
	render() {
		return (
			<Container>
				<Helmet title="Profile"/>
				<CUser id={this.props.match.params.id}/>
			</Container>
		);
	}
}
