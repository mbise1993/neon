import { injectable } from 'inversify';

import { AuthService } from '../../auth/services/auth.service';

@injectable()
export class AppService {
  constructor(private readonly authService: AuthService) {}

  get activeUser() {
    return this.authService.loggedInUser!;
  }
}
