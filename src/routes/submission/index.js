import { h, Component } from 'preact';
import { Container } from 'semantic-ui-react';
import { Submission as CSubmission } from '../../components/submission';
import Helmet from 'preact-helmet';

export default class Submission extends Component {
    constructor() {
        super();
        this.state = {
            submission: {},
        };
    }

    componentDidMount() {
        fetch('http://localhost/api/submissions/'+this.props.id+'?includeResult=true')
        .then(result => {
            return result.json();
        }).then(data => {
            this.setState({submission: data.submission});
        });
    }

    render() {
        return <CSubmission submission={this.state.submission} />;
    }
}