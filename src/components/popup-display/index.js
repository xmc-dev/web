import { h } from 'preact';
import { connect } from 'preact-redux';
import { Popup } from './popup';

const mapStateToProps = state => {
	return { popups: state.popup.popups };
};

function ConnectedPopupDisplay({ popups }) {
	let i = 0;
	const ret = popups.map(p => <Popup key={i++} id={p.id} popup={p.popup}/>);

	// Create some space between this and the main container
	let style = {};
	if (popups.length > 0) {
		style['margin-bottom'] = '2rem';
	}
	return <div style={style}>{ret}</div>;
}

export const PopupDisplay = connect(mapStateToProps)(ConnectedPopupDisplay);
