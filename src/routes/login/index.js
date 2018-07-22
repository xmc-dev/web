import { h, Component } from 'preact';
import { Header, Container } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { withText } from 'preact-i18n';
import { paramsToObject } from '../../lib/query-params';
import { connect } from 'preact-redux';
import { showPopupWithTimeout } from '../../actions/popup';
import { makeAuthorize, getToken } from '../../actions/auth';

const mapDispatchToProps = (dispatch, props) => ({
	onRedirect: () => {
		dispatch(
			showPopupWithTimeout({
				title: props.popupTitle,
				body: props.popupBody,
				state: 'success'
			})
		);
	},
	token: (code, state) => dispatch(getToken(code, state))
});

function ConnectedAuthorize({ scope, doAuthorize, url }) {
	if (url) {
		window.location.replace(url);
	} else {
		doAuthorize(scope.join(' '));
	}
	return null;
}

const Authorize = connect(
	state => ({
		url: state.auth.url
	}),
	dispatch => ({
		doAuthorize: scope => dispatch(makeAuthorize(scope))
	})
)(ConnectedAuthorize);

function checkParams(params) {
	return 'code' in params && 'state' in params;
}

class ConnectedLogin extends Component {
	constructor(props) {
		super(props);
		this.state = { error: {}, redirect: false };
	}

	componentWillMount() {
		if (window.location.search) {
			const params = paramsToObject(window.location.search);
			if ('error' in params) {
				this.setState({ error: params });
				return;
			}
			if (!checkParams(params)) {
				/* eslint-disable camelcase */
				this.setState({
					error: {
						error: 'misc_error',
						error_description: `
The authentification process didn't return the correct values. Please contact the administrator of the instance.`
					}
				});
				/* eslint-enable camelcase */
				return;
			}

			this.props
				.token(params.code, params.state)
				.then(() => {
					this.setState({ redirect: true });
				})
				.catch(error => {
					this.setState({ error });
				});
		}
	}

	render() {
		if (!window.location.search) {
			return <Authorize scope={['xmc.core/manage', 'xmc.core/submission']}/>;
		}
		if (this.state.redirect) {
			this.props.onRedirect();
			return <Redirect to="/"/>;
		}
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

const Login = withText({
	popupTitle: 'login.popup.title',
	popupBody: 'login.popup.body'
})(
	connect(
		() => ({}),
		mapDispatchToProps
	)(ConnectedLogin)
);
export default Login;
