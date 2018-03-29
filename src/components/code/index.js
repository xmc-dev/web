import { h } from 'preact';
import MonacoEditor from 'react-monaco-editor';

export function Code({ code }) {
	return (
		<pre style={{ overflowX: 'auto' }}>
			<code style={{ overflowWrap: 'normal', whiteSpace: 'pre' }}>{code}</code>
		</pre>
	);
}

export function CodeView({ code, language }) {
	return (
		<MonacoEditor
			requireConfig={{ url: '/vs/loader.js', paths: { vs: '/vs' } }}
			value={code}
			language={language}
			options={{
				readOnly: true,
				fontSize: 16,
				fontLigatures: true,
				fontFamily: 'monospace'
			}}
			height="600"
		/>
	);
}
