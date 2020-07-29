import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { AnyObject } from '../utils/types';

export abstract class ViewModel<TState extends AnyObject> {
  private readonly _state: BehaviorSubject<TState>;
  private readonly _subscriptions: Subscription[];

  public constructor(initialState: TState) {
    this._state = new BehaviorSubject(initialState);
    this._subscriptions = [];
    this.state$ = this._state.asObservable();
  }

  public state$: Observable<TState>;

  public get state() {
    return this._state.value;
  }

  public setState(newState: Partial<TState>) {
    this._state.next({
      ...this.state,
      ...newState,
    });
  }

  public dispose() {
    this._subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });

    this._subscriptions.length = 0;
  }

  protected observe<TKey extends keyof TState>(key: TKey): Observable<TState[TKey]> {
    return this.state$.pipe(
      map(value => value[key]),
      distinctUntilChanged(),
    );
  }

  protected subscribe<T>(observable: Observable<T>, onNext: (value: T) => void) {
    const subscription = observable.subscribe(onNext);
    this._subscriptions.push(subscription);
  }
}
