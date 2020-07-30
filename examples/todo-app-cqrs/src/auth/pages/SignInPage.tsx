import React from 'react';

import { useSignInFacade } from '../facades/auth.facade';

export const SignInPage: React.FC = () => {
  const facade = useSignInFacade();

  return (
    <section className="todoapp">
      <header className="header">
        <button onClick={() => facade.handleSignInClick()}>Sign In</button>
      </header>
    </section>
  );
};
