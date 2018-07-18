import { h, Component } from 'preact';
import {
	Label,
	Input,
	Container,
	Button,
	Segment,
	Header
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'preact-redux';
import { readPageIfNeeded, updatePage } from '../../actions/pages';
import { CodeEditor } from '../code';
import { PageView } from '../page';
import { showPopupWithTimeout } from '../../actions/popup';
import { ErrorMessage } from '../error-message';
import { getPage as aGetPage } from '../../lib/api/page';

class ConnectedPageEditor extends Component {
	constructor(props) {
		super(props);
		this.state = { contents: '', title: '', path: '' };
		this.interval = null;
		this.editor = null;
		this.titleInput = null;
		this.getPage = this.getPage.bind(this);
		this.editorDidMount = this.editorDidMount.bind(this);
		this.update = this.update.bind(this);
	}

	componentDidMount() {
		this.getPage(this.props.id);
	}

	getPage() {
		this.props.getPage(this.props.id).then(() =>
			aGetPage(this.props.id === '<root>' ? '/' : this.props.id, {
				raw: true
			}).then(page => {
				this.setState({
					page,
					title: page.version.title,
					contents: page.version.contents,
					path: page.path
				});
				this.props.setPath(page.path);
			})
		);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	editorDidMount(editor) {
		this.editor = editor;
		this.interval = setInterval(() => {
			if (this.state.contents !== editor.getValue()) {
				this.setState({ contents: editor.getValue() });
			}
		}, 100);
	}

	componentDidUpdate(oldProps) {
		if (this.props.id !== oldProps.id) {
			this.getPage();
		}
		if (
			this.props.update.successTime instanceof Date &&
			this.props.update.successTime !== oldProps.update.successTime
		) {
			this.props.showPopup({
				title: 'Page updated successfully',
				body: (
					<span>
						You can see the new page <Link to={this.state.path}>here</Link>.
					</span>
				),
				state: 'success'
			});
		}
	}

	update() {
		this.props.doUpdate(this.state.page.id, {
			contents: this.editor.getValue(),
			title: this.state.title
		});
	}

	render() {
		let err = null;
		if (this.props.update.error) {
			err = (
				<ErrorMessage
					error={this.props.update.error.name}
					detail={this.props.update.error.message}
				/>
			);
		}
		return (
			<Container>
				{err}
				<p>
					<Input
						labelPosition="left"
						placeholder="Title"
						onChange={e => this.setState({ title: e.target.value })}
						fluid
					>
						<Label>Title</Label>
						<input value={this.state.title}/>
					</Input>
				</p>
				<p>
					<CodeEditor
						code={this.state.contents}
						language="markdown"
						editorDidMount={this.editorDidMount}
					/>
				</p>
				<p>
					<Button onClick={this.update}>Update</Button>
				</p>
				<Header as="h2">Preview</Header>
				<Segment padded>
					<PageView content={this.state.contents}/>
				</Segment>
			</Container>
		);
	}
}

export const PageEditor = connect(
	(state, props) => {
		const id = state.pages.ids[props.id === '<root>' ? '/' : props.id];
		const update = state.pages.updates[id] || {};
		return { update };
	},
	dispatch => ({
		getPage: id => dispatch(readPageIfNeeded(id === '<root>' ? '/' : id)),
		doUpdate: (id, update) => dispatch(updatePage(id, update)),
		showPopup: popup => dispatch(showPopupWithTimeout(popup))
	})
)(ConnectedPageEditor);
