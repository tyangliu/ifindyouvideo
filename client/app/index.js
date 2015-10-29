'use strict';

import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, Link } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { App, Test, Home } from './containers';
import configureStore from './redux/configureStore';

const store = configureStore();

React.render(
  <Provider store={store}>
    <Router history={createBrowserHistory()}>
      <Route path='/' component={App}>
        <IndexRoute component={Home} />
        <Route path='test' component={Test} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
