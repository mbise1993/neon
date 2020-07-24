import React from 'react';
import { useHistory } from 'react-router';

import { SignInViewModel } from '../viewModels/signIn.viewModel';
import { useObservable, useViewModel } from '../../common/hooks';

export const SignInPage: React.FC = () => {
  const vm = useViewModel(SignInViewModel);
  const history = useHistory();

  const userId = useObservable(vm.$userId, '');

  React.useEffect(() => {
    vm.tryRestoreSession().then(success => {
      if (success) {
        history.push('/all');
      }
    });
  }, []);

  const onKeyDown = async (e: React.KeyboardEvent) => {
    // Enter
    if (e.keyCode === 13) {
      const success = await vm.signIn();
      if (success) {
        history.push('/all');
      }
    }
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>sign in</h1>
        <input
          autoFocus
          className="new-todo"
          placeholder="Enter your user ID"
          value={userId}
          onChange={e => vm.setUserId(e.target.value)}
          onKeyDown={onKeyDown}
        />
      </header>
    </section>
  );
};
