import './style';
import App from './components/app';
import { Provider } from 'preact-redux';
import '../node_modules/semantic-ui/dist/semantic.min.css';
import store from './store';
import { h } from 'preact';

export default () => (
	<Provider store={store}>
		<App/>
	</Provider>
);
