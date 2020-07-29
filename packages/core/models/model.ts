import { BehaviorSubject } from 'rxjs';

import { AnyObject } from '../utils/types';

export class Model<TFields extends AnyObject> {
  public constructor(initialFields: TFields) {
    this.fields$ = new BehaviorSubject<TFields>(initialFields);
  }

  public fields$: BehaviorSubject<TFields>;

  public get fields(): TFields {
    return this.fields$.value;
  }

  public get<TKey extends keyof TFields>(field: TKey): TFields[TKey] {
    return this.fields$.value[field];
  }

  public set(newFields: Partial<TFields>) {
    this.fields$.next({
      ...this.fields,
      ...newFields,
    });
  }
}
