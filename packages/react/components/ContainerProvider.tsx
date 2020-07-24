import React from 'react';
import { Container } from 'inversify';

export const ContainerContext = React.createContext<Container | null>(null);

export interface ContainerProviderProps {
  container: Container;
}

export const ContainerProvider: React.FC<ContainerProviderProps> = ({ container, children }) => {
  return <ContainerContext.Provider value={container}>{children}</ContainerContext.Provider>;
};
