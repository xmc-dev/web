import { h } from 'preact';
import MonacoEditor from 'react-monaco-editor';

const requireConfig = { url: '/vs/loader.js', paths: { vs: '/vs' } };
const editorOptions = {
	fontSize: 16,
	fontLigatures: true,
	fontFamily: 'monospace',
	automaticLayout: true
};
const editorHeight = 600;

export function Code({ code }) {
	return (
		<pre style={{ overflowX: 'auto' }}>
			<code style={{ overflowWrap: 'normal', whiteSpace: 'pre' }}>{code}</code>
		</pre>
	);
}

export function CodeView({ code, language, editorDidMount }) {
	return (
		<MonacoEditor
			requireConfig={requireConfig}
			value={code}
			language={language}
			options={{
				readOnly: true,
				...editorOptions
			}}
			height={editorHeight}
			editorDidMount={editorDidMount}
		/>
	);
}

export function CodeEditor({ code = '', language, editorDidMount }) {
	return (
		<MonacoEditor
			requireConfig={requireConfig}
			value={code}
			language={language}
			options={{ ...editorOptions }}
			height={editorHeight}
			editorDidMount={editorDidMount}
		/>
	);
}
