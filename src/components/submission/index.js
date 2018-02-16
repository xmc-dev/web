import { h, Component } from 'preact';
import { getShortStatus } from '../../lib/submission';

export class Submission extends Component {
    render() {
        return <p>{getShortStatus(this.props.submission)}</p>;
    }
}