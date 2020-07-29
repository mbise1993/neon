import React from 'react';

import { ClassType } from '@neon/core';

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

interface IReadOnly<T> {
  get(): T;
}

interface IReadWrite<T> {
  get(): T;
  set(value: T): void;
}

interface IReactViewModel<T> {
  [key: string]: IReadOnly<any> | IReadWrite<any>;
}

export function useViewModel<T>(TClass: ClassType<T>) {}
