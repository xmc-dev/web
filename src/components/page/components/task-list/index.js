import { h, Component } from 'preact';
import { Item } from 'semantic-ui-react';
import { TaskListItem } from './item';
import { ErrorMessage } from '../../../error-message';
import { getTasks } from '../../../../lib/api/task';

export class TaskList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tasks: [],
			error: null
		};
	}

	componentDidMount() {
		getTasks(this.props.taskListId)
			.then(data => {
				let i = 0;
				const tasks = data.map(task => {
					i++;
					return <TaskListItem key={i} task={task}/>;
				});
				this.setState({ tasks });
			})
			.catch(error => {
				this.setState({ error });
			});
	}

	render() {
		if (this.state.error) {
			return (
				<ErrorMessage
					error={this.state.error.name}
					detail={this.state.error.message}
				/>
			);
		}
		return <Item.Group>{this.state.tasks}</Item.Group>;
	}
}
