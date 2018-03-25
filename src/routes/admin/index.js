import { h, Component } from 'preact';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './home';

export default function Admin() {
	return (
		<Switch>
			<Route path="/admin" exact component={Home} />
		</Switch>
	);
}
