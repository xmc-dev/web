import { h, Component } from 'preact';
import { getShortStatus } from '../../lib/submission';
import { api } from '../../lib/api';
import { ErrorMessage } from '../error-message';

export class Submission extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submission: {},
            error: null,
        };
    }

    componentDidMount() {
        api('/submissions/'+this.props.id+'?includeResult=true')
        .then(data => {
            this.setState({ submission: data.submission });
        }).catch(error => {
            this.setState({ error });
        });
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage error={this.state.error.message} />
        }
        return <p>{getShortStatus(this.state.submission)}</p>;
    }
}