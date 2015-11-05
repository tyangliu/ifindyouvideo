'use strict';

import React from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import ReactRouterRelay from 'react-router-relay';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { App, Test, Home, Videos } from './containers';


React.render(
  <Router createElement={ReactRouterRelay.createElement}
          history={createBrowserHistory()}>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path='videos' component={Videos} />
      <Route path='test' component={Test} />
    </Route>
  </Router>,
  document.getElementById('root')
);
