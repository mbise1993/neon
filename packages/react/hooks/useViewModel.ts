import React from 'react';
import { Subscription } from 'rxjs';

import { ClassType, ViewModel } from '@neon/core';

import { useInject } from './useInject';

type Initialize<T extends ViewModel<T>> = (vm: T) => void;

export function useViewModel<T extends ViewModel<any>>(
  TClass: ClassType<T>,
  initialize: Initialize<T> = () => {},
): T {
  const vm = useInject(TClass);
  const subscriptionRef = React.useRef<Subscription | null>(null);
  const [, setState] = React.useState(vm.state);

  if (!subscriptionRef.current) {
    const subscription = vm.state$.subscribe(state => {
      setState(state);
    });

    subscriptionRef.current = subscription;
    initialize(vm);
  }

  React.useEffect(() => {
    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
        subscriptionRef.current = null;
      }
    };
  }, []);

  return vm;
}
