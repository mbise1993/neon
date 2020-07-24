import React from 'react';

import { ScopeService } from '@neon/core';

import { useInject } from '../hooks/useInject';

export interface ScopedProps {
  scopes: string[];
  children: React.ReactElement;
}

export const Scoped: React.FC<ScopedProps> = ({ scopes, children }) => {
  const [areScopesAttached, setScopesAttached] = React.useState(false);
  const scopeService = useInject(ScopeService);

  React.useEffect(() => {
    scopes.forEach(scope => {
      scopeService.attach(scope);
    });

    setScopesAttached(true);

    return () => {
      scopes.forEach(scope => {
        scopeService.detach(scope);
      });
    };
  }, []);

  return areScopesAttached ? children : null;
};
