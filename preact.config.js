import CopyWebpackPlugin from 'copy-webpack-plugin';
import preactCliSwPrecachePlugin from 'preact-cli-sw-precache';

export default config => {
	config.plugins.push(
		new CopyWebpackPlugin([
			{
				from: `${__dirname}/node_modules/monaco-editor/min/vs`,
				to: 'vs'
			}
		])
	);

	const precacheConfig = {
		runtimeCaching: [{
			urlPattern: /\/oauth2\//,
			handler: 'networkFirst'
		}],
		handleFetch: false
	};

	return preactCliSwPrecachePlugin(config, precacheConfig);
};
