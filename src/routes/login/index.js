import { h, Component } from 'preact';
import { Container } from 'semantic-ui-react';
import { route } from 'preact-router';

export default class Login extends Component {
	componentWillMount() {
		route(true);
	}

	render() {
		return null;
	}
}
