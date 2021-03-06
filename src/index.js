import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-table/react-table.css';
import "react-toggle/style.css";

import "react-big-calendar/lib/css/react-big-calendar.css";

import 'bootstrap/dist/css/bootstrap.css'; //Date range Picker
import 'bootstrap-daterangepicker/daterangepicker.css'; //Date range Picker

import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
