import 'reflect-metadata';

import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Route, HashRouter as Router } from 'react-router-dom';

import { AppView } from './app/views/App.view';
import { configureContainer } from './container.config';
import { ContainerProvider } from './common/components';
import { SignInPage } from './auth/views/SignInPage.view';

const container = configureContainer();

ReactDOM.render(
  <React.StrictMode>
    <ContainerProvider container={container}>
      <Router>
        <Route exact path="/signin">
          <SignInPage />
        </Route>
        <Route exact path={['/all', '/active', '/completed']}>
          <AppView />
        </Route>
        <Redirect to="/signin" />
      </Router>
    </ContainerProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
