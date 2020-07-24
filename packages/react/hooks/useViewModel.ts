import React from 'react';

import { Type } from '../../graphql/utils';
import { useContainer } from '../components';
import { ViewModel } from '../viewModels';

const isShallowEqual = (a: any, b: any) => {
  if (a === b) return true;
  if (!(a instanceof Object) || !(b instanceof Object)) return false;

  const keys = Object.keys(a);
  const length = keys.length;

  for (let i = 0; i < length; i++) {
    if (!(keys[i] in b)) {
      return false;
    }
  }

  for (let i = 0; i < length; i++) {
    if (a[keys[i]] !== b[keys[i]]) {
      return false;
    }
  }

  return length === Object.keys(b).length;
};

export function useViewModel<T extends ViewModel>(type: Type<T>): T;
export function useViewModel<TProps, T extends ViewModel<TProps>>(type: Type<T>, props: TProps): T;
export function useViewModel<TProps, T extends ViewModel<TProps>>(
  type: Type<T>,
  props?: TProps,
): T {
  const container = useContainer();
  const previousProps = React.useRef<TProps>();

  const viewModel = React.useMemo(() => {
    const vm = container.get<T>(type);
    if (props) {
      vm.$props.next(props);
    }

    return vm;
  }, []);

  if (!previousProps.current || !isShallowEqual(previousProps.current, props)) {
    previousProps.current = props;
  }

  React.useEffect(() => {
    if (props) {
      viewModel.$props.next(props);
    }

    return () => viewModel.dispose();
  }, [previousProps.current]);

  return viewModel;
}
