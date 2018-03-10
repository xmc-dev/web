import { h, Component } from 'preact';
import { Header, Container } from 'semantic-ui-react';
import { route } from 'preact-router';
import { authorize, token } from '../../lib/auth';
import { paramsToObject } from '../../lib/query-params';

export default class Login extends Component {
	constructor() {
		super();
		this.state = { error: {} };
	}

	componentWillMount() {
		if (window.location.search) {
			const params = paramsToObject(window.location.search);
			if ('error' in params) {
				this.setState({ error: params });
				return;
			}
			if (!this.checkParams(params)) {
				this.setState({
					error: {
						error: 'misc_error',
						error_description: `
The authentification process didn't return the correct values. Please contact the administrator of the instance.`
					}
				});
				return;
			}

			token(params.code, params.state)
				.then(() => {
					route('/', true);
				})
				.catch(error => {
					this.setState({ error });
				});
			return;
		}

		const url = authorize({ scope: 'xd lol lmao' });
		window.location.replace(url);
	}

	checkParams(params) {
		return 'code' in params && 'state' in params;
	}

	render() {
		if ('error' in this.state.error) {
			return (
				<Container>
					<Header as="h1">Error</Header>
					<Header as="h2">{this.state.error.error_description}</Header>
					<Header as="h4">{this.state.error.error}</Header>
				</Container>
			);
		}
	}
}
