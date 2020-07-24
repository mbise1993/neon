import React from 'react';
import { BehaviorSubject } from 'rxjs';

export function useBind<T>(subject: BehaviorSubject<T>): [T, (value: T) => void] {
  const [currentValue, setCurrentValue] = React.useState(subject.getValue());

  React.useEffect(() => {
    const subscription = subject.subscribe(value => setCurrentValue(value));
    return () => subscription.unsubscribe();
  }, [subject]);

  const setValue = (value: T) => {
    subject.next(value);
  };

  return [currentValue, setValue];
}
