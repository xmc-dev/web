import { h, Component } from 'preact';
import { Item } from 'semantic-ui-react';
import { TaskListItem } from './item';
import { ErrorMessage } from '../error-message';
import { api } from '../../lib/api';
import { getTasks } from '../../lib/api/task';

export class TaskList extends Component {
	constructor() {
		super();
		this.state = {
			tasks: [],
			error: null
		};
	}

	componentDidMount() {
		getTasks()
			.then(data => {
				const tasks = data.map(task => {
					return <TaskListItem task={task} />;
				});
				this.setState({ tasks });
			})
			.catch(error => {
				this.setState({ error });
			});
	}

	render() {
		if (this.state.error) {
			return <ErrorMessage error={this.state.error.message} />;
		}
		return <Item.Group>{this.state.tasks}</Item.Group>;
	}
}
