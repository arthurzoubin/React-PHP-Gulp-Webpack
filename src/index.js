'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import thunk from 'redux-thunk';

import reducers from './reducers';
import App from './App';
import Test from './modules/test/container';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers);

ReactDOM.render((
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Test}/>
                <Route path="/react(/)" component={Test} />
            </Route>
        </Router>
    </Provider>
), document.querySelector("#app"));