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
