import React from 'react';

import { ClassType } from '../utils/types';
import { useContainer } from './useContainer';

export function useInject<T1>(...types: [ClassType<T1>]): T1;
export function useInject<T1, T2>(...types: [ClassType<T1>, ClassType<T2>]): [T1, T2];
export function useInject<T1, T2, T3>(
  ...types: [ClassType<T1>, ClassType<T2>, ClassType<T3>]
): [T1, T2, T3];
export function useInject<T1, T2, T3, T4>(
  ...types: [ClassType<T1>, ClassType<T2>, ClassType<T3>, ClassType<T4>]
): [T1, T2, T3, T4];
export function useInject<T1, T2, T3, T4, T5>(
  ...types: [ClassType<T1>, ClassType<T2>, ClassType<T3>, ClassType<T4>, ClassType<T5>]
): [T1, T2, T3, T4, T5];
export function useInject<T1, T2, T3, T4, T5>(...types: [ClassType<any>]) {
  const instancesRef = React.useRef<any[]>();
  const container = useContainer();

  if (!instancesRef.current) {
    instancesRef.current = types.map(type => container.get(type));
  }

  return instancesRef.current;
}
