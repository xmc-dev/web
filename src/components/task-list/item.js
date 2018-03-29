import { h } from 'preact';
import { Item } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export function TaskListItem(props) {
	return (
		<Item>
			<Item.Content>
				<Item.Header>
					<Link to={`/archive/${props.task.name}`}>{props.task.title}</Link>
				</Item.Header>
				<Item.Meta>{props.task.name}</Item.Meta>
			</Item.Content>
		</Item>
	);
}
