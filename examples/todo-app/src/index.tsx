import 'reflect-metadata';

import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Route, HashRouter as Router } from 'react-router-dom';

import { ContainerProvider, Scoped } from '@neon/react';

import { AppScope } from './scopes';
import { configureContainer } from './container.config';
import { SignInPage } from './auth/pages/SignInPage';
import { TodoListPage } from './todo/pages/TodoListPage';

const container = configureContainer();

ReactDOM.render(
  <React.StrictMode>
    <ContainerProvider container={container}>
      <Router>
        <Route exact path="/signin">
          <SignInPage />
        </Route>
        <Route exact path={['/all', '/active', '/completed']}>
          <Scoped scopes={[AppScope.LOGGED_IN]}>
            <TodoListPage />
          </Scoped>
        </Route>
        <Redirect to="/signin" />
      </Router>
    </ContainerProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
