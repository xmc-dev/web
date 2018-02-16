import { h, Component } from 'preact';
import Helmet from 'preact-helmet';
import { Container, Header } from 'semantic-ui-react';
import { SubmissionMonitor } from '../../components/submission-monitor';

export default class Monitor extends Component {
    render() {
        return (
            <Container>
                <Helmet title="Monitorul de evaluare" />
                <Header as='h1'>Monitorul de evaluare</Header>
                <SubmissionMonitor/>
            </Container>
        )
    }
}