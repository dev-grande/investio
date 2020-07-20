import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './helpers';
import { App } from './App';
import 'bootstrap/dist/css/bootstrap.css';
import 'fomantic-ui-css/semantic.css';

// setup fake backend
import { configureFakeBackend } from './helpers';
configureFakeBackend();

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);