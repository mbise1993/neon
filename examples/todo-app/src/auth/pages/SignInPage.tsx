import React from 'react';
import { useHistory } from 'react-router';

import { useViewModel } from '@neon/react';

import { SignInViewModel } from '../viewModels/signIn.viewModel';

export const SignInPage: React.FC = () => {
  const history = useHistory();
  const vm = useViewModel(SignInViewModel);

  const onSignInClick = () => {
    const success = vm.signIn();
    if (success) {
      history.push('/all');
    }
  };

  return (
    <section className="todoapp">
      <header className="header">
        <button onClick={onSignInClick}>Sign In</button>
      </header>
    </section>
  );
};
