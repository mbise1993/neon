import { BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';

export abstract class ViewModel<TProps = void> {
  $props = new BehaviorSubject<TProps>({} as TProps);

  constructor() {
    this.$props.pipe(first()).subscribe(value => this.onInit(value));
  }

  onInit(props: TProps) {}

  dispose() {}
}
