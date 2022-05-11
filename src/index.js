import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './routes/App.route'
import { Provider } from 'react-redux';
import { store }  from './redux/store'
import CssBaseline from '@mui/material/CssBaseline';

// document.dir='rtl'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <Router>
      <CssBaseline />
      <App />
    </Router>
  </Provider>
  // </React.StrictMode>
);
