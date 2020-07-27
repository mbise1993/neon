import React from 'react';
import { Observable, Subscription } from 'rxjs';

import { Observable as NeonObservable } from '@neon/core';

import { ClassType } from '../utils/types';
import { useInject } from './useInject';

type Create<T> = () => T;

type Bind<T> = (observable: Observable<T>) => void;

type Initialize<T> = (obj: T, bind: Bind<any>) => void;

function isClassType<T>(obj: any): obj is ClassType<T> {
  return !!obj.prototype && !!obj.prototype.constructor.name;
}

export function useVm<T>(TClass: ClassType<T>, initialize?: Initialize<T>): T;
export function useVm<T>(
  createOrClass: Create<T> | ClassType<T>,
  initialize: Initialize<T> = () => {},
): T {
  let obj: T;
  if (isClassType<T>(createOrClass)) {
    obj = useInject(createOrClass);
  } else {
    const objRef = React.useRef(createOrClass());
    obj = objRef.current;
  }

  const [subscriptions, setSubscriptions] = React.useState<Subscription[]>([]);

  const [, updateState] = React.useState({});
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const bind = <T>(observable: Observable<T>) => {
    const subscription = observable.subscribe(() => {
      forceUpdate();
    });

    setSubscriptions([...subscriptions, subscription]);
  };

  React.useEffect(() => {
    initialize(obj, bind);

    return () => {
      subscriptions.forEach(subscription => {
        subscription.unsubscribe();
      });
    };
  }, []);

  return obj;
}

type ViewModelInitializer<T> = (viewModel: T) => void;

export function useViewModel<T extends NeonObservable>(
  TClass: ClassType<T>,
  initializer: ViewModelInitializer<T> = () => {},
): T {
  const [, updateState] = React.useState({});
  const initializedRef = React.useRef(false);
  const viewModel = useInject(TClass);

  const forceUpdate = React.useCallback(() => updateState({}), []);

  if (!initializedRef.current) {
    initializer(viewModel);

    viewModel.subscribe(() => {
      forceUpdate();
    });

    initializedRef.current = true;
  }

  React.useEffect(() => {
    return () => {
      viewModel.dispose();
    };
  }, []);

  return viewModel;
}

// const isShallowEqual = (a: any, b: any) => {
//   if (a === b) return true;
//   if (!(a instanceof Object) || !(b instanceof Object)) return false;

//   const keys = Object.keys(a);
//   const length = keys.length;

//   for (let i = 0; i < length; i++) {
//     if (!(keys[i] in b)) {
//       return false;
//     }
//   }

//   for (let i = 0; i < length; i++) {
//     if (a[keys[i]] !== b[keys[i]]) {
//       return false;
//     }
//   }

//   return length === Object.keys(b).length;
// };

// export function useViewModel<T extends ViewModel>(type: ClassType<T>): T;
// export function useViewModel<TProps, T extends ViewModel<TProps>>(
//   type: ClassType<T>,
//   props: TProps,
// ): T;
// export function useViewModel<TProps, T extends ViewModel<TProps>>(
//   type: ClassType<T>,
//   props?: TProps,
// ): T {
//   const container = useContainer();
//   const previousProps = React.useRef<TProps>();

//   const viewModel = React.useMemo(() => {
//     const vm = container.get<T>(type);
//     if (props) {
//       vm.$props.next(props);
//     }

//     return vm;
//   }, []);

//   if (!previousProps.current || !isShallowEqual(previousProps.current, props)) {
//     previousProps.current = props;
//   }

//   React.useEffect(() => {
//     if (props) {
//       viewModel.$props.next(props);
//     }

//     return () => viewModel.dispose();
//   }, [previousProps.current]);

//   return viewModel;
// }
