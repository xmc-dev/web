import { h } from 'preact';
import { Dropdown } from 'semantic-ui-react';
import { connect } from 'preact-redux';
import definitionEN from '../../translations/en.json';
import definitionRO from '../../translations/ro.json';
import { changeLang } from '../../actions/lang';

const langs = {
	en: definitionEN,
	ro: definitionRO
};

const options = [
	{ key: 'en', text: langs.en.name, value: 'en' },
	{ key: 'ro', text: langs.ro.name, value: 'ro' }
];

function ConnectedLangChooser({ langId, setLang }) {
	return (
		<Dropdown
			upward
			icon=""
			trigger={
				<img src={langs[langId].icon} className="luchian round-small-icon"/>
			}
			options={options}
			onChange={(e, { value }) => {
				setLang(value);
			}}
			value={langId}
			className="luchian high-dropdown"
		/>
	);
}

export const LangChooser = connect(
	state => ({ langId: state.lang.id }),
	dispatch => ({
		setLang: id => dispatch(changeLang(id))
	})
)(ConnectedLangChooser);
