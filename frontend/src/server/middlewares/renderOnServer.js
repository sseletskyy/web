import React from 'react';
import ReactDOMServer from 'react-dom/server';

import Relay from 'react-relay';
import { match } from 'react-router';
import IsomorphicRouter from 'isomorphic-relay-router';
import { StyleSheetServer } from 'aphrodite';

import { Provider } from 'react-redux';
import configureStore from '../../store/configureStore';

import config from '../../../config.json';
import Page from '../components/Page';
import getRoutes from '../../routes';


export default (req, res, next) => {
  const userHeader = req.get('X-Proxy-User-Header');
  const user = userHeader && JSON.parse(userHeader);
  const token = req.cookies && req.cookies.id_token;

  // set relay network layer
  const graphQLAddress = `${process.env.APP_URL}${config.graphQLPath}`;
  const networkLayer = new Relay.DefaultNetworkLayer(graphQLAddress, {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    credentials: 'same-origin',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  // create a new redux store instance
  const initialState = { user };
  const store = configureStore(initialState);
  const finalState = store.getState();

  function render({ data, props }) {
    let cssUri;
    let jsUri;
    if (process.env.NODE_ENV === 'production') {
      const assets = require('../../../assets.json'); // eslint-disable-line global-require
      cssUri = `/assets/${assets.app.find(path => path.endsWith('.css'))}`;
      jsUri = `/assets/${assets.app.find(path => path.endsWith('.js'))}`;
    } else {
      cssUri = null;
      jsUri = '/assets/app.js';
    }
    const { html, css } = StyleSheetServer.renderStatic(() => {
      return ReactDOMServer.renderToString(
        <Provider store={store}>
          {IsomorphicRouter.render(props)}
        </Provider>
      );
    });
    // const markup = ReactDOMServer.renderToString(
    //   <Provider store={store}>
    //     {IsomorphicRouter.render(props)}
    //   </Provider>
    // );
    res.send(`<!DOCTYPE html>\n${ReactDOMServer.renderToStaticMarkup(
      <Page
        cssUri={cssUri}
        data={data}
        initialState={finalState}
        jsUri={jsUri}
        markup={html}
        css={css}
      />
    )}`);
  }
  match({
    routes: getRoutes(store),
    location: req.originalUrl,
  }, (error, redirectLocation, renderProps) => {
    if (error) {
      next(error);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      IsomorphicRouter.prepareData(renderProps, networkLayer).then(render, next);
    } else {
      res.status(404).send('Not Found');
    }
  });
};
