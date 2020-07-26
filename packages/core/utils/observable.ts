type Subscriber = () => void;

export abstract class Observable {
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
