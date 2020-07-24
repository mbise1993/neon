import { BehaviorSubject } from 'rxjs';

import { Injectable, ScopeService } from '@neon/core';

import { AppScope } from '../../scopes';
import { StorageService } from '../../common/services/storage.service';
import { User } from '../models/user.model';

@Injectable()
export class AuthService {
  private readonly activeUser = new BehaviorSubject<User | null>(null);

  constructor(
    private readonly scopeService: ScopeService,
    private readonly storageService: StorageService,
  ) {}

  $activeUser = this.activeUser.asObservable();

  public get loggedInUser() {
    return this.activeUser.value;
  }

  public async signIn(userId: string): Promise<boolean> {
    this.activeUser.next(new User());
    this.scopeService.attach(AppScope.LOGGED_IN);
    return true;
  }

  public signOut() {
    this.activeUser.next(null);
    this.scopeService.detach(AppScope.LOGGED_IN);
  }
}
