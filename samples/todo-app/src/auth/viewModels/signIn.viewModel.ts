import { injectable } from 'inversify';

import { AuthService } from '../services/auth.service';
import { BehaviorSubject } from 'rxjs';
import { ViewModel } from '../../common/viewModels';

@injectable()
export class SignInViewModel extends ViewModel {
  private readonly userId = new BehaviorSubject<string>('');

  constructor(private readonly authService: AuthService) {
    super();
  }

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

  async tryRestoreSession() {
    return this.authService.tryRestoreSession();
  }
}
