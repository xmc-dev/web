import { h, Component } from 'preact';
import { Table } from 'semantic-ui-react';
import { ErrorMessage } from '../error-message';
import { SubmissionMonitorRow, SubmissionMonitorHeaderRow } from './row';
import { api } from '../../lib/api';

export class SubmissionMonitor extends Component {
    constructor() {
        super();
        this.state = {
            submissions: [],
            error: null,
        };
    }

    componentDidMount() {
        api('/submissions/?includeResult=true')
        .then(data => {
            let submissions = data.submissions.map((sub) => {
                return <SubmissionMonitorRow sub={sub} />
            });
            this.setState({submissions: submissions});
        }).catch(error => {
            this.setState({ error });
        });
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage error={this.state.error.message} />
        }
        return (
            <Table celled>
                <Table.Header>
                    <SubmissionMonitorHeaderRow />
                </Table.Header>
                <Table.Body>
                    {this.state.submissions}
                </Table.Body>
            </Table>
        )
    }
}