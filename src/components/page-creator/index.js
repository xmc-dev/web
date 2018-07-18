import { h, Component } from 'preact';
import { Container, Form, Dimmer, Loader } from 'semantic-ui-react';
import { connect } from 'preact-redux';
import { Link, Redirect } from 'react-router-dom';
import { createPage } from '../../actions/pages';
import { ErrorMessage } from '../error-message';
import { showPopupWithTimeout } from '../../actions/popup';

class ConnectedPageCreator extends Component {
	constructor(props) {
		super(props);
		this.state = {
			path: '',
			title: '',
			redirect: false
		};
		this.create = this.create.bind(this);
	}

	create() {
		this.props.doCreate(
			{ path: this.state.path },
			this.state.title,
			'hello there'
		);
	}

	componentDidUpdate(oldProps) {
		const c = this.props.creations[this.state.path];
		if (
			c &&
			c.isFetching === false &&
			c !== oldProps.creations[this.state.path]
		) {
			/* eslint-disable react/no-did-update-set-state */
			if (c.error) {
				this.setState({ error: c.error });
			} else {
				this.props.showPopup({
					title: 'Page created successfully',
					body: (
						<Link to={this.state.path}>Click here to see the new page</Link>
					),
					state: 'success'
				});
				this.setState({ redirect: true });
			}
			/* eslint-enable react/no-did-update-set-state */
		}
	}

	render() {
		const err = this.state.error ? (
			<ErrorMessage
				error={this.state.error.name}
				detail={this.state.error.message}
			/>
		) : null;
		const redir = this.state.redirect ? (
			<Redirect to={`/admin/pages/edit${this.state.path}`}/>
		) : null;
		return (
			<Container>
				{redir}
				<Dimmer
					inverted
					active={
						this.props.creations[this.state.path] ?
							this.props.creations[this.state.path].isFetching :
							false
					}
				>
					<Loader/>
				</Dimmer>
				{err}
				<Form>
					<Form.Group widths="equal">
						<Form.Input
							fluid
							label="Path"
							placeholder="/somewhere/close"
							onChange={e => this.setState({ path: e.target.value })}
						>
							<input value={this.state.path}/>
						</Form.Input>
						<Form.Input
							fuild
							label="Title"
							placeholder="Hamlet"
							onChange={e => this.setState({ title: e.target.value })}
						>
							<input value={this.state.title}/>
						</Form.Input>
					</Form.Group>
					<Form.Button onClick={this.create}>Submit</Form.Button>
				</Form>
			</Container>
		);
	}
}

export const PageCreator = connect(
	state => ({
		creations: state.pages.creations
	}),
	dispatch => ({
		doCreate: (page, title, contents) =>
			dispatch(createPage(page, title, contents)),
		showPopup: popup => dispatch(showPopupWithTimeout(popup))
	})
)(ConnectedPageCreator);
