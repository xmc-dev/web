import { h } from 'preact';
import { Route, Switch } from 'react-router-dom';

import Home from './home';
import PageEdit from './page/edit';
import PageList from './page/list';

export default function Admin() {
	return (
		<Switch>
			<Route path="/admin" exact component={Home}/>
			<Route path="/admin/pages/:id*/edit" exact component={PageEdit}/>
			<Route path="/admin/pages/:id*" exact component={PageList}/>
		</Switch>
	);
}
