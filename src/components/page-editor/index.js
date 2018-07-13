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
import { getAttachmentContent } from '../../lib/api/attachment';
import { CodeEditor } from '../code';
import { PageView } from '../page';
import { showPopupWithTimeout } from '../../actions/popup';
import { ErrorMessage } from '../error-message';

class ConnectedPageEditor extends Component {
	constructor(props) {
		super(props);
		this.state = { content: '', title: '', path: '' };
		this.interval = null;
		this.editor = null;
		this.titleInput = null;
		this.getContent = this.getContent.bind(this);
		this.editorDidMount = this.editorDidMount.bind(this);
		this.setPath = this.setPath.bind(this);
		this.update = this.update.bind(this);
	}

	getContent(props) {
		if (props.version.attachmentId) {
			getAttachmentContent(props.version.attachmentId).then(att => {
				this.setState({ content: att.data });
			});
		}
	}

	componentDidMount() {
		this.props
			.getPage(this.props.id)
			.then(() => this.getContent(this.props))
			.then(() => this.setPath(this.props))
			.then(() => this.setState({ title: this.props.version.title }));
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	editorDidMount(editor) {
		this.editor = editor;
		this.interval = setInterval(() => {
			if (this.state.content !== editor.getValue()) {
				this.setState({ content: editor.getValue() });
			}
		}, 100);
	}

	setPath(props) {
		props.setPath(props.page.path);
		this.setState({ path: props.page.path });
	}

	componentDidUpdate(oldProps) {
		if (
			this.props.page !== oldProps.page &&
			typeof this.props.setPath === 'function' &&
			this.props.page.path
		) {
			this.setPath(this.props);
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
		this.props.doUpdate(this.props.page.id, {
			contents: btoa(this.editor.getValue()),
			title: this.state.title
		});
	}

	render() {
		let err = null;
		if (this.props.update.error) {
			err = (
				<ErrorMessage
					error={this.props.update.error.message}
					detail={this.props.update.error.body.error}
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
						code={this.state.content}
						language="markdown"
						editorDidMount={this.editorDidMount}
					/>
				</p>
				<p>
					<Button onClick={this.update}>Update</Button>
				</p>
				<Header as="h2">Preview</Header>
				<Segment padded>
					<PageView content={this.state.content}/>
				</Segment>
			</Container>
		);
	}
}

export const PageEditor = connect(
	(state, props) => {
		const id = state.pages.ids[props.id === '<root>' ? '/' : props.id];
		const page = state.pages.byId[id] || {};
		const update = state.pages.updates[id] || {};
		return { page, version: page.version || {}, update };
	},
	dispatch => ({
		getPage: id => dispatch(readPageIfNeeded(id === '<root>' ? '/' : id)),
		doUpdate: (id, update) => dispatch(updatePage(id, update)),
		showPopup: popup => dispatch(showPopupWithTimeout(popup))
	})
)(ConnectedPageEditor);
