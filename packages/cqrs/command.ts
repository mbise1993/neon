import { ClassType } from '@neon/core';

export interface IServiceProvider {
  get<T>(TClass: ClassType<T>): T;
}

export interface ICommand {
  canExecute(serviceProvider: IServiceProvider): boolean;
  execute(serviceProvider: IServiceProvider): void;
}
