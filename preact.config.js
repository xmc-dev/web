import CopyWebpackPlugin from 'copy-webpack-plugin';

export default config => {
	config.plugins.push(
		new CopyWebpackPlugin([
			{
				from: `${__dirname}/node_modules/monaco-editor/min/vs`,
				to: 'vs'
			}
		])
	);
};
