import { h, Component } from 'preact';
import { Item } from 'semantic-ui-react';
import { TaskListItem } from './item';

export class TaskList extends Component {
    constructor() {
        super();
        this.state = {
            tasks: [],
        };
    }

    componentDidMount() {
        fetch('http://localhost/api/tasks/?includeResult=true')
        .then(results => {
            return results.json();
        }).then(data => {
            let tasks = data.tasks.map((task) => {
                return <TaskListItem task={task} />
            });
            this.setState({tasks: tasks});
        });
    }

    render() {
        return (
            <Item.Group>
                {this.state.tasks}
            </Item.Group>
        )
    }
}