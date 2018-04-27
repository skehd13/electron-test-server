import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {createLogger} from 'redux-logger'
import App from './containers/app';
import loginInfoApp from "./redux/reducer";
import { Switch, Route} from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'

const logger = createLogger();

const history = createBrowserHistory()

const middleware = [routerMiddleware(history), thunk, logger];

const store = createStore(
    loginInfoApp,
    applyMiddleware(...middleware)
);

console.log("hello")
const rootElement = document.getElementById('root');
ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route path="/" component={App} />
            </Switch>
        </ConnectedRouter>
    </Provider>,
    rootElement);