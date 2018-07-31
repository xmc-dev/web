import { Component, h } from 'preact';
import { User as CUser } from '../../components/user';
import { Title } from '../../components/title';

export default class User extends Component {
	render() {
		return (
			<main>
				<Title id="profile.title"/>
				<CUser id={this.props.match.params.id}/>
			</main>
		);
	}
}
