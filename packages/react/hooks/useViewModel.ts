import React from 'react';

import { Observable } from '@neon/core';

import { ClassType } from '../utils/types';
import { useInject } from './useInject';

type ViewModelInitializer<T> = (viewModel: T) => void;

export function useViewModel<T extends Observable>(
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
