import 'reflect-metadata';

import React from 'react';
import ReactDOM from 'react-dom';

import { ContainerProvider } from '@neon/react';

import { App } from './App';
import { configureContainer } from './container.config';

const container = configureContainer();

ReactDOM.render(
  <React.StrictMode>
    <ContainerProvider container={container}>
      <App />
    </ContainerProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
