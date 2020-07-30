import { BehaviorSubject } from 'rxjs';

import { Injectable } from '@neon/core';

import { User } from '../models/user.model';

@Injectable()
export class AuthService {
  private readonly activeUser = new BehaviorSubject<User | null>(null);

  $activeUser = this.activeUser.asObservable();

  public getLoggedInUser() {
    return this.activeUser.value;
  }

  public signIn(userId: string): boolean {
    this.activeUser.next(new User());
    return true;
  }

  public signOut() {
    this.activeUser.next(null);
  }
}
