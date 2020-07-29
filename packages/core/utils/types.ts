export type AnyObject = Record<string, any>;

export interface ClassType<T> extends Function {
  new (...args: any[]): T;
}
