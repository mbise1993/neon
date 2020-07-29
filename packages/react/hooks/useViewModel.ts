import React from 'react';
import { Subscription } from 'rxjs';

import { ClassType, ViewModel } from '@neon/core';

import { useInject } from './useInject';

function isClassType<T>(obj: any): obj is ClassType<T> {
  return typeof obj === 'function' && !!obj.name;
}

type Create<T extends ViewModel<T>> = () => T;

type Initialize<T extends ViewModel<T>> = (vm: T) => void;

export function useViewModel<T extends ViewModel<any>>(
  createOrClass: Create<T> | ClassType<T>,
  initialize: Initialize<T> = () => {},
): T {
  let vm: T;
  if (isClassType(createOrClass)) {
    vm = useInject(createOrClass);
  } else {
    const vmRef = React.useRef(createOrClass());
    vm = vmRef.current;
  }

  const subscriptionRef = React.useRef<Subscription | null>(null);
  const [, setState] = React.useState(vm.state);

  if (!subscriptionRef.current) {
    const subscription = vm.state$.subscribe(state => {
      setState(state);
    });

    initialize(vm);
    subscriptionRef.current = subscription;
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
