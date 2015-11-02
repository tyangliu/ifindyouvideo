'use strict';

import React from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { App, Test, Home, Map } from './containers';

React.render(
  <Router history={createBrowserHistory()}>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path='map' component={Map} />
      <Route path='test' component={Test} />
    </Route>
  </Router>,
  document.getElementById('root')
);
