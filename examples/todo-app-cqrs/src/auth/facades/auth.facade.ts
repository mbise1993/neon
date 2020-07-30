import { useHistory } from 'react-router';

import { useInject } from '@neon/react';

import { AuthService } from '../services/auth.service';
import { CommandService } from '@neon/cqrs';
import { SignInCommand } from 'auth/commands/signIn.command';

export function useSignInFacade() {
  const commandService = useInject(CommandService);
  const authService = useInject(AuthService);
  const history = useHistory();

  const handleSignInClick = () => {
    commandService.execute(new SignInCommand());
    const success = authService.signIn('1');
    if (success) {
      history.push('/all');
    }
  };

  return {
    handleSignInClick,
  };
}
