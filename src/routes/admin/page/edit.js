import { h, Component } from 'preact';
import { Header, Container } from 'semantic-ui-react';
import Helmet from 'preact-helmet';
import { PageEditor } from '../../../components/page-editor';

export default class PageEdit extends Component {
	constructor(props) {
		super(props);
		this.state = { path: '' };
		this.setPath = this.setPath.bind(this);
	}

	setPath(path) {
		this.setState({ path });
	}

	render() {
		return (
			<Container>
				<Helmet title={`Edit page ${this.state.path}`}/>
				<Header as="h1">Edit page {this.state.path}</Header>
				<PageEditor id={this.props.match.params.id} setPath={this.setPath}/>
			</Container>
		);
	}
}
