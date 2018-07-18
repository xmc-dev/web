import { h } from 'preact';
import { Redirect, Route, Switch } from 'react-router-dom';

import Home from './home';
import PageEdit from './page/edit';
import PageList from './page/list';
import PageCreate from './page/create';
import NotFound from '../status-pages/notfound';

export default function Admin() {
	return (
		<Switch>
			<Route path="/admin" exact component={Home}/>
			<Route
				path="/admin/pages"
				exact
				component={() => <Redirect to="/admin/pages/list"/>}
			/>
			<Route path="/admin/pages/edit/:id*" exact component={PageEdit}/>
			<Route path="/admin/pages/new/:id*" exact component={PageCreate}/>
			<Route path="/admin/pages/list/:id*" exact component={PageList}/>
			<Route component={NotFound}/>
		</Switch>
	);
}
