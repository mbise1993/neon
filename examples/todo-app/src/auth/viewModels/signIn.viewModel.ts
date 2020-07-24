import { inject } from 'inversify';

import { Injectable } from '@neon/core';

import { AuthService } from '../services/auth.service';

@Injectable()
export class SignInViewModel {
  constructor(@inject(AuthService) private readonly authService: AuthService) {}

  public signIn() {
    return this.authService.signIn('1');
  }
}
