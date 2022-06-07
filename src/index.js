import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './routes/App.route'
import './index.scss'
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store }  from './redux/store'
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';


const theme = createTheme({
	direction: 'rtl',
	prepend: true,
	typography: {
		fontFamily: 'shabnam, Arial',
	}
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Provider store={store}>
        <ThemeProvider theme={theme}>
			<Router>
				<CssBaseline />
				<App />
			</Router>
        </ThemeProvider>
    </Provider>
  // </React.StrictMode>
);
