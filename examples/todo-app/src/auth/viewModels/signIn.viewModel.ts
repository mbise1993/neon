import { Inject, Injectable, Observable } from '@neon/core';

import { AuthService } from '../services/auth.service';

@Injectable()
export class SignInViewModel extends Observable {
  public constructor(@Inject(AuthService) private authService: AuthService) {
    super();
  }

  public signIn() {
    return this.authService.signIn('1');
  }
}
