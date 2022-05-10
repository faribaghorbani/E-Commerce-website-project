import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.module.css'
import { BrowserRouter as Router } from 'react-router-dom';
import App from './routes/App.route'

document.dir='rtl'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Router>
      <App />
    </Router>
  // </React.StrictMode>
);
