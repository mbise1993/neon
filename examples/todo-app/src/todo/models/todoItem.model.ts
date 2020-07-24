import { BehaviorSubject, Observable } from 'rxjs';

type AnyObject = Record<string, any>;

export class Model<TFields extends AnyObject> {
  private fields: BehaviorSubject<TFields>;

  public constructor(initialFields: TFields) {
    this.fields = new BehaviorSubject<TFields>(initialFields);
    this.$fields = this.fields.asObservable();
  }

  public $fields: Observable<TFields>;

  public getFields() {
    return this.fields.value;
  }

  public get<TKey extends keyof TFields>(field: TKey): TFields[TKey] {
    return this.fields.value[field];
  }

  public set(newFields: Partial<TFields>) {
    this.fields.next({
      ...this.getFields(),
      ...newFields,
    });
  }
}

export interface TodoItemFields {
  id: string;
  text: string;
  isDone?: boolean;
}

export class TodoItem {
  private _isComplete = false;

  public constructor(private id: string, private text: string) {}

  public getId() {
    return this.id;
  }

  public getText() {
    return this.text;
  }

  public setText(value: string) {
    this.text = value;
  }

  public isComplete() {
    return this._isComplete;
  }

  public setComplete(value: boolean) {
    this._isComplete = value;
  }
}
