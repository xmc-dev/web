import { Component, h } from 'preact';
import { Page as PageComponent } from '../../components/page';

export default class Page extends Component {
	constructor(props) {
		super(props);
		this.state = { url: props.location.pathname };
	}

	componentWillReceiveProps(update) {
		this.setState({ url: update.location.pathname });
	}

	render() {
		return <PageComponent url={this.state.url}/>;
	}
}
