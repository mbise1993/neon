import React from 'react';

import { Container } from '@neon/core';

import { ContainerContext, ContainerProvider } from '../components/ContainerProvider';

export const useContainer = (): Container => {
  const container = React.useContext(ContainerContext);
  if (!container) {
    throw new Error(`${useContainer.name} must be called from within a ${ContainerProvider.name}`);
  }

  return container;
};
