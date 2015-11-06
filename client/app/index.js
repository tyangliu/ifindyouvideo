'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import { Router, Route, IndexRoute, Link } from 'react-router';
import ReactRouterRelay from 'react-router-relay';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { App, Test, Home, Videos } from './containers';

const VideoQueries = {
  video: () => Relay.QL`
    query root {
      video(rawId: "1001")
    }
  `
}

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('http://127.0.0.1:8080')
);

ReactDOM.render(
  <Router createElement={ReactRouterRelay.createElement}
          history={createBrowserHistory()}>
    <Route path='/' component={App} queries={VideoQueries}>
      <IndexRoute component={Home} />
      <Route path='videos' component={Videos} queries={VideoQueries} />
      <Route path='test' component={Test} />
    </Route>
  </Router>,
  document.getElementById('root')
);
