import { h, Component } from 'preact';
import { Container } from 'semantic-ui-react';
import Helmet from 'preact-helmet';
import { PageEditor } from '../../../components/page-editor';
import { PageNeedsScope } from '../../../components/has-scope';
import { Header } from '../../../components/page/components/header';

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
			<main>
				<PageNeedsScope scope="xmc.core/manage/page">
					<Helmet title={`Edit page ${this.state.path}`}/>
					<Header title="Edit page" subtitle={this.state.path}/>
					<PageEditor id={this.props.match.params.id} setPath={this.setPath}/>
				</PageNeedsScope>
			</main>
		);
	}
}
