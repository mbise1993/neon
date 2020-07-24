import React from 'react';
import { useHistory } from 'react-router';

import { useInject } from '@neon/react';

import { SignInViewModel } from '../viewModels/signIn.viewModel';

export const SignInPage: React.FC = () => {
  const history = useHistory();
  const vm = useInject(SignInViewModel);

  const onSignInClick = async () => {
    const success = await vm.signIn();
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
