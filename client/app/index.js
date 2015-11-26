'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import { Router, Route, IndexRoute, Link } from 'react-router';
import ReactRouterRelay from 'react-router-relay';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { App, Test, Home, Videos } from './containers';

const ViewerQueries = {
  viewer: () => Relay.QL`
    query root { viewer(idToken: $idToken) }
  `
}

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('http://127.0.0.1:8080')
);

const prepareVideoParams = (params, route) => {
  let city    = params.city || ''
    , year    = parseInt(params.year)
    , month   = parseInt(params.month)
    , idToken = params.idToken;

  if (!year)  { year = 0; }
  if (!month) { month = 0; }

  return { city, year, month, idToken };
};

ReactDOM.render(
  <Router createElement={ReactRouterRelay.createElement}
          history={createBrowserHistory()}>
    <Route path='/' component={App}
           queries={ViewerQueries}
           prepareParams={prepareVideoParams}
           stateParams={['city', 'year', 'month', 'idToken']}>
      <IndexRoute component={Home} />
      <Route path='videos' component={Videos} />
      <Route path='test' component={Test} />
    </Route>
  </Router>,
  document.getElementById('root')
);
