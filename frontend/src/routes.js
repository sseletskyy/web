// Directory structor follows recommendations by @ryanflorence
// https://gist.github.com/ryanflorence/daafb1e3cb8ad740b346

import React from 'react';
import { createRoutes, IndexRoute, IndexRedirect, Route } from 'react-router';
import { canUseDOM } from 'exenv';

import App from './screens/App';

import Home from './screens/App/screens/Home/Home';

import { viewerQuery } from './queries';

import Loader from './screens/App/shared/components/Loader';
import RedirectOnMount from './screens/App/shared/components/RedirectOnMount';

import { refresh } from './shared/utils/auth';

const render = ({ error, props, routerProps, element }) => {
  if (error) {
    return (<RedirectOnMount to="/" />);
  }
  if (!props) {
    return <Loader {...routerProps} />;
  }
  return React.cloneElement(element, props);
};

export default (store) => {
  const refreshToken = (nextState, replace, cb) => {
    const user = store.getState().user;
    if (user && canUseDOM) {
      refresh().then(() => {
        setInterval(refresh, 3600000); // refresh every hour
        cb();
      });
    } else {
      cb();
    }
  };
  const requireLogin = (nextState, replace, cb) => {
    const user = store.getState().user;
    if (!user) {
      // oops not logged in, so can't be here!
      replace('/');
    }
    cb();
  };
  const prepareParamsWithUser = (cb) => {
    return (params, state) => {
      const user = store.getState().user;
      const orig = cb ? cb(params, state) : {};
      return { ...params, ...orig, loggedIn: !!user };
    };
  };
  // routes
  return createRoutes(
    <Route path="/" component={App} onEnter={refreshToken}>
      <IndexRoute component={Home} queries={viewerQuery} />
    </Route>
  );
};
