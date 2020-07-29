import React from 'react';
import { Observable } from 'rxjs';

export function useObservable<T>(observable: Observable<T>): T | undefined;
export function useObservable<T>(observable: Observable<T>, defaultValue: T): T;
export function useObservable<T>(observable: Observable<T>, defaultValue?: T) {
  const [currentValue, setCurrentValue] = React.useState(defaultValue);

  React.useEffect(() => {
    const subscription = observable.subscribe(value => setCurrentValue(value));
    return () => subscription.unsubscribe();
  }, [observable]);

  return currentValue!;
}
