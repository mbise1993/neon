import { Injectable } from '@neon/core';

import { AuthService } from '../../auth/services/auth.service';

@Injectable()
export class AppService {
  constructor(private readonly authService: AuthService) {}

  public getActiveUser() {
    return this.authService.loggedInUser!;
  }
}
