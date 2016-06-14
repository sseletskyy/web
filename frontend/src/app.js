import IsomorphicRelay from 'isomorphic-relay';
import IsomorphicRouter from 'isomorphic-relay-router';
import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import { match, Router, browserHistory, applyRouterMiddleware } from 'react-router';

// import { useHistoryRestoreScroll, useRouterRestoreScroll } from 'react-router-restore-scroll';

import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

import config from '../config.json';

import './styles/app.scss';

const environment = new Relay.Environment();

// const createHistory = useHistoryRestoreScroll(() => browserHistory);
// const routerRender = applyRouterMiddleware(useRouterRestoreScroll());
const graphQLAddress = `${process.env.APP_URL}${config.graphQLPath}`;
environment.injectNetworkLayer(new Relay.DefaultNetworkLayer(graphQLAddress, {
  credentials: 'same-origin',
}));

const data = JSON.parse(document.getElementById('preloadedData').textContent);
const initialState = JSON.parse(document.getElementById('reduxData').textContent);

IsomorphicRelay.injectPreparedData(environment, data);

// create redux store with initial state
const store = configureStore(initialState);

const rootElement = document.getElementById('root');

function render() {
  const getRoutes = require('./routes').default; // eslint-disable-line global-require
  match({
    routes: getRoutes(store),
    history: browserHistory,
  }, (error, redirectLocation, renderProps) => {
    IsomorphicRouter.prepareInitialRender(environment, renderProps).then(props => {
      ReactDOM.render(
        <Provider store={store}>
          <Router {...props} />
        </Provider>
      , rootElement);
    });
  });
}

render();

if (module.hot) {
  module.hot.accept('./routes', () => {
    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(rootElement);
      render();
    });
  });
}
