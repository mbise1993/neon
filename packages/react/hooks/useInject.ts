import React from 'react';

import { ClassType } from '../utils/types';
import { useContainer } from './useContainer';

export const useInject = <T>(type: ClassType<T>): T => {
  const container = useContainer();
  const instanceRef = React.useRef(container.get(type));

  return instanceRef.current;
};
