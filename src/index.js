import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.module.css'
import { BrowserRouter as Router } from 'react-router-dom';
import App from './routes/App.route'
import { Provider } from 'react-redux';
import store  from './redux/store'

document.dir='rtl'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
  // </React.StrictMode>
);
