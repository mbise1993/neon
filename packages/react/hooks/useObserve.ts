import React from 'react';
import { Observable } from 'rxjs';

import { Observable as NeonObservable } from '@neon/core';

export function useObserve<T>(observable: Observable<T>): T | undefined;
export function useObserve<T>(observable: Observable<T>, defaultValue: T): T;
export function useObserve<T>(observable: Observable<T>, defaultValue?: T) {
  const [currentValue, setCurrentValue] = React.useState(defaultValue);

  React.useEffect(() => {
    const subscription = observable.subscribe(value => setCurrentValue(value));
    return () => subscription.unsubscribe();
  }, [observable]);

  return currentValue!;
}

export function useObservable<T extends NeonObservable>(createObservable: () => T): T {
  const { current: observable } = React.useRef(createObservable());
  const [updateFlag, setUpdateFlag] = React.useState(false);

  React.useEffect(() => {
    observable.subscribe(() => {
      setUpdateFlag(!updateFlag);
    });

    return () => {
      observable.dispose();
    };
  }, []);

  return observable;
}
