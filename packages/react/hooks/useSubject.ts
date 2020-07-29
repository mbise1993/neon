import React from 'react';
import { BehaviorSubject } from 'rxjs';

export function useSubject<T>(subject: BehaviorSubject<T>): T {
  const [currentValue, setCurrentValue] = React.useState(subject.value);

  React.useEffect(() => {
    const subscription = subject.subscribe(value => {
      setCurrentValue(value);
    });

    return () => subscription.unsubscribe();
  }, [subject]);

  return currentValue;
}
