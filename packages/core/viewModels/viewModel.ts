import { Model } from 'models/model';

export abstract class ViewModel {
  private subscribers: Subscriber[] = [];

  public subscribe(subscriber: Subscriber) {
    this.subscribers.push(subscriber);
  }

  public dispose() {
    this.subscribers = [];
  }

  protected notify() {
    this.subscribers.forEach(subscriber => subscriber());
  }
}

type ModelFields<TModel extends Model<any>> = ReturnType<TModel['getFields']>;

export abstract class ItemViewModel<TModel extends Model<any>> extends ViewModel {
  private model: TModel | null = null;
  private fields: ModelFields<TModel> | null = null;

  public bindModel(model: TModel) {
    this.model = model;
    this.fields = { ...this.model.getFields() };

    this.model.fields.subscribe(() => this.notify());
  }

  public get<TKey extends keyof ModelFields<TModel>>(key: TKey): ModelFields<TModel>[TKey] {
    if (!this.fields) {
      throw new Error('Model not set');
    }

    return this.fields[key];
  }

  public set<TKey extends keyof ModelFields<TModel>>(key: TKey, value: ModelFields<TModel>[TKey]) {
    if (!this.fields) {
      throw new Error('Model not set');
    }

    this.fields[key] = value;
    this.notify();
  }

  public revert() {
    if (!this.model || !this.fields) {
      throw new Error('Model not set');
    }

    this.fields = { ...this.model.getFields() };
  }

  public commit() {
    if (!this.model || !this.fields) {
      throw new Error('Model not set');
    }

    this.model.set(this.fields);
    this.fields = { ...this.model.getFields() };
  }

  protected getModel(): TModel {
    if (!this.model) {
      throw new Error('Model not set');
    }

    return this.model;
  }
}
