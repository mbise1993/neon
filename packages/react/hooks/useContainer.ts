import React from 'react';

import { ContainerContext, ContainerProvider } from '../components/ContainerProvider';

export const useContainer = () => {
  const container = React.useContext(ContainerContext);
  if (!container) {
    throw new Error(`${useContainer.name} must be called from within a ${ContainerProvider.name}`);
  }

  return container;
};
