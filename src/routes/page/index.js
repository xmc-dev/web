import { h } from 'preact';
import { Page as PageComponent } from '../../components/page';

export default function Page(props) {
	if (props.location && props.location.pathname) {
		return <PageComponent url={props.location.pathname}/>;
	}
	return <div/>;
}
