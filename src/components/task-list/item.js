import { h, Component } from 'preact';
import { Item } from 'semantic-ui-react';

export function TaskListItem(props) {
	return (
		<Item>
			<Item.Content>
				<Item.Header as="a">{props.task.name}</Item.Header>
				<Item.Meta>Description</Item.Meta>
				<Item.Description>{props.task.description}</Item.Description>
			</Item.Content>
		</Item>
	);
}
