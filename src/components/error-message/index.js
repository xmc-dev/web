import { h } from 'preact';
import { Message } from 'semantic-ui-react';
import { Text, withText } from 'preact-i18n';
import Helmet from 'preact-helmet';

/**
 *
 * @param {object} props
 * @param {string} props.error Error message to be displayed.
 * @param {string} props.detail
 */
export function ErrorMessage({ error, detail }) {
	if (detail) {
		detail = detail.charAt(0).toUpperCase() + detail.substr(1);
	}
	console.error(error, detail);
	return (
		<Message negative>
			<Message.Header>
				<Text id="error-message.error" fields={{ error }}/>
			</Message.Header>
			<pre>
				<p>{detail}</p>
			</pre>
		</Message>
	);
}

export const ForbiddenPage = withText({
	error: 'error-message.forbidden-page.error',
	detail: 'error-message.forbidden-page.detail'
})(props => {
	return (
		<div>
			<Helmet title="Forbidden"/>
			<ErrorMessage error={props.error} detail={props.detail}/>
		</div>
	);
});
