import { h, Component } from 'preact';
import { Table } from 'semantic-ui-react';
import { SubmissionMonitorRow, SubmissionMonitorHeaderRow } from './row';

export class SubmissionMonitor extends Component {
    constructor() {
        super();
        this.state = {
            submissions: [],
        };
    }

    componentDidMount() {
        fetch('http://localhost/api/submissions/?includeResult=true')
        .then(results => {
            return results.json();
        }).then(data => {
            let submissions = data.submissions.map((sub) => {
                return <SubmissionMonitorRow sub={sub} />
            });
            this.setState({submissions: submissions});
        });
    }

    render() {
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