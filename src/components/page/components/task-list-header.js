import { h, Component } from 'preact';
import { Message } from 'semantic-ui-react';

export class TaskListHeader extends Component {
	// eslint-disable capitalized-comments
	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		participants: []
	// 	};
	// }
	// eslint-enable capitalized-comments

	render() {
		return (
			<Message>
				<Message.Header>Inscrie-te la concurs</Message.Header>
				<p>
					Trebuie sa te inscrii la acest concurs pentru a participa. Click{' '}
					<a href="#" onClick={this.participate}>
						aici pentru a te inscrie
					</a>.
				</p>
			</Message>
		);
	}
}
