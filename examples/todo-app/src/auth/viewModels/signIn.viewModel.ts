import { Inject, Injectable } from '@neon/core';

import { AuthService } from '../services/auth.service';

@Injectable()
export class SignInViewModel {
  public constructor(@Inject(AuthService) private authService: AuthService) {}

  public signIn() {
    return this.authService.signIn('1');
  }
}
