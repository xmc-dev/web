import { h, Component } from 'preact';
import Helmet from 'preact-helmet';
import { Container } from 'semantic-ui-react';
import { XMCML } from '../../components/xmcml';
import { api, rawApi } from '../../lib/api';

export class TestComponent extends Component {
	render() {
		return <h1>{this.props.foo} works!</h1>;
	}
}

export default class Page extends Component {
	constructor() {
		super();
		this.state = {
			page: {},
			url: '',
			content: ''
		};
	}

	componentWillMount() {
		api('/pages' + this.props.url)
			.then(data => {
				this.setState({ page: data.page });
				return data.page.version;
			})
			.then(data => {
				api('/attachments/' + data.attachmentId + '/file')
					.then(data => {
						this.setState({ url: data.url });
						fetch(data.url, { headers: { Origin: window.location.origin } })
							.then(data => {
								if (!data.ok) {
									throw new Error(data.statusText);
								}
								return data.text();
							})
							.then(content => {
								this.setState({ content: content });
							})
							.catch(error => {
								throw error;
							})
					})
					.catch(error => {
						throw error;
					})
			})
			.catch(error => {
				throw error;
			});
	}

	componentWillReceiveProps(update) {
		console.log(update.url);
		api('/pages' + update.url)
			.then(data => {
				this.setState({ page: data.page });
				return data.page.version;
			})
			.then(data => {
				api('/attachments/' + data.attachmentId + '/file')
					.then(data => {
						this.setState({ url: data.url });
						fetch(data.url, { headers: { Origin: window.location.origin } })
							.then(data => {
								if (!data.ok) {
									throw new Error(data.statusText);
								}
								return data.text();
							})
							.then(content => {
								this.setState({ content: content });
							})
							.catch(error => {
								throw error;
							})
					})
					.catch(error => {
						throw error;
					})
			})
			.catch(error => {
				throw error;
			});
	}

	render() {
		return (
			<Container>
				<Helmet title="AAAA" />
				<XMCML md={this.state.content} components={{TestComponent}} />
			</Container>
		);
	}
}
