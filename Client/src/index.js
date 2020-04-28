import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
ReactDOM.render(
     <div className ="contenedorDesktop">
  <Router>
    <App />
  </Router>
  </div>
, document.getElementById('root'));

