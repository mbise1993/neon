import { fromEvent, merge } from 'rxjs';
import { map } from 'rxjs/operators';

import { Injectable } from '../utils/di';

@Injectable()
export class HistoryService {
  public location = merge(fromEvent(window, 'popstate'), fromEvent(window, 'hashchange')).pipe(
    map(() => window.location),
  );
}
