import React from 'react';

import { Type } from '../../core/utils/types';
import { useContainer } from './useContainer';

export const useInject = <T>(type: Type<T>): T => {
  const container = useContainer();
  const instanceRef = React.useRef(container.get(type));

  return instanceRef.current;
};
