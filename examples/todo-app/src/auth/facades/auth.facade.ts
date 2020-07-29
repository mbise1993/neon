import { useHistory } from 'react-router';

import { useInject } from '@neon/react';

import { AuthService } from '../services/auth.service';

export function useSignInFacade() {
  const authService = useInject(AuthService);
  const history = useHistory();

  const handleSignInClick = () => {
    const success = authService.signIn('1');
    if (success) {
      history.push('/all');
    }
  };

  return {
    handleSignInClick,
  };
}
