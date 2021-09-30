import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import App from './App';
import { store } from './state/store';
import { theme } from './MUITheme';
import globalStyles from './GlobalCSS';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			{globalStyles()}
			<Provider store={store}>
				<Router>
					<App />
				</Router>
			</Provider>
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
