import { h, Component } from 'preact';
import { Router } from 'preact-router';
import Helmet from 'preact-helmet';

import Navigation from './navigation';
import Home from '../routes/home';
import Monitor from '../routes/monitor';
import Submission from '../routes/submission';
import Archive from '../routes/archive';

// import Home from 'async!../routes/home';
// import Profile from 'async!../routes/profile';
// import Monitor from 'async!../routes/monitor';
// import Submission from 'async!../routes/submission';

export default class App extends Component {
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render() {
		return (
			<div id="app">
				<Navigation />
				<div id="container">
					<Router onChange={this.handleRoute}>
						<Home path="/" />
						<Archive path="/archive" />
						<Monitor path="/submissions" />
						<Submission path="/submissions/:id" />
					</Router>
				</div>
			</div>
		);
	}
}
