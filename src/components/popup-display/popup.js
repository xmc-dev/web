import { Message } from 'semantic-ui-react';
import { connect } from 'preact-redux';
import { hidePopup } from '../../actions/popup';

const mapDispatchToProps = dispatch => ({
	onDismiss: id => () => dispatch(hidePopup(id))
});

function ConnectedPopup({ id, popup: { title, body }, onDismiss }) {
	return (
		<Message onDismiss={onDismiss(id)}>
			<Message.Header>{title}</Message.Header>
			<p>{body}</p>
		</Message>
	);
}

export const Popup = connect(() => ({}), mapDispatchToProps)(ConnectedPopup);
