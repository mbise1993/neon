import React from 'react';
import { Observable } from 'rxjs';

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
