import { BehaviorSubject } from 'rxjs';

import { Injectable } from '@neon/core';

import { AuthService } from '../services/auth.service';

@Injectable()
export class SignInViewModel {
  private readonly userId = new BehaviorSubject<string>('');

  constructor(private readonly authService: AuthService) {}

  $userId = this.userId.asObservable();

  setUserId(value: string) {
    this.userId.next(value);
  }

  async signIn() {
    const success = await this.authService.signIn(this.userId.value);
    if (success) {
      this.userId.next('');
    }

    return success;
  }
}
