import { withText } from 'preact-i18n';
import Helmet from 'preact-helmet';
import { h } from 'preact';

function RawTitle({ title }) {
	console.log(title);
	return <Helmet title={title}/>;
}

export const Title = ({ id }) => {
	const Comp = withText({ title: id })(RawTitle);
	return <Comp/>;
};
