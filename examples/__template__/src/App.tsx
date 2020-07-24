import React from 'react';
import { Redirect, Route, HashRouter as Router, useHistory } from 'react-router-dom';

import { Scoped } from '@neon/react';

import { AppScope } from './scopes';

export const App: React.FC = () => {
  const history = useHistory();

  const onSignInClick = () => {
    history.push('/app');
  };

  return (
    <Router>
      <Route exact path="/signin">
        <button onClick={onSignInClick}>Sign In</button>
      </Route>
      <Route exact path="/app">
        <Scoped scopes={[AppScope.LOGGED_IN]}>
          <div>Hello Neon!</div>
        </Scoped>
      </Route>
      <Redirect to="/signin" />
    </Router>
  );
};
