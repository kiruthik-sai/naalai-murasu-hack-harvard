import React from 'react';
import ReactDOM from 'react-dom/client';
import $ from "jquery";
import "turn.js";
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
    <Routes>
      <Route path='/login' element={< Login/>} />
      <Route path='/register' element={< Register/>} />
      <Route path='/' element={< App/>} />
    </Routes>
  </Router>
);




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA


serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
