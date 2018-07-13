import './style';
import App from './components/app';
import { Provider } from 'preact-redux';
import './semantic/dist/semantic.min.css';
import '../node_modules/katex/dist/katex.min.css';
import store from './store';
import { h } from 'preact';

export default () => (
	<Provider store={store}>
		<App/>
	</Provider>
);
