import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { store } from './helpers';
import { App } from './App';
import "mdbreact/dist/css/mdb.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap/dist/css/bootstrap.css';
import 'fomantic-ui-css/semantic.css';

// setup fake backend
// import { configureFakeBackend } from './helpers';
// configureFakeBackend();

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
  document.getElementById('root')
);