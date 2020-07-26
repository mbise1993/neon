import { BehaviorSubject } from 'rxjs';

type AnyObject = Record<string, any>;

export class Model<TFields extends AnyObject> {
  public constructor(initialFields: TFields) {
    this.fields = new BehaviorSubject<TFields>(initialFields);
  }

  public fields: BehaviorSubject<TFields>;

  public getFields(): TFields {
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
