import { h, Component } from 'preact';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navigation from './navigation';
import Monitor from '../routes/monitor';
import Submission from '../routes/submission';
import Archive from '../routes/archive';
import Login from '../routes/login';
import Page from '../routes/page';
import Admin from '../routes/admin';
import { PopupDisplay } from './popup-display';
import { Container } from 'semantic-ui-react';
import User from '../routes/user';
import Logout from '../routes/logout';
import Settings from '../routes/settings';

// Import Home from 'async!../routes/home';
// import Profile from 'async!../routes/profile';
// import Monitor from 'async!../routes/monitor';
// import Submission from 'async!../routes/submission';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.currentUrl = {};
		this.handleRoute = this.handleRoute.bind(this);
	}

	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute(e) {
		this.currentUrl = e.url;
	}

	render() {
		return (
			<Router onChange={this.handleRoute}>
				<div id="app">
					<Navigation/>
					<div id="container">
						<Container>
							<PopupDisplay/>
						</Container>
						<Switch>
							<Route path="/" exact component={Page}/>
							<Route path="/archive" exact component={Archive}/>
							<Route path="/submissions" exact component={Monitor}/>
							<Route path="/submissions/:id" exact component={Submission}/>
							<Route path="/login" exact component={Login}/>
							<Route path="/logout" exact component={Logout}/>
							<Route path="/user" exact component={User}/>
							<Route path="/settings" component={Settings}/>
							<Route path="/admin" component={Admin}/>
							<Route component={Page}/>
						</Switch>
					</div>
				</div>
			</Router>
		);
	}
}
