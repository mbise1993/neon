import React from 'react';
import { useLocation } from 'react-router';

import { getFilterFromPath } from '../../common/utils/filiter';

interface Props {
  itemsLeft: number;
  onClearCompletedClick(): void;
}

export const TodoListFooter: React.FC<Props> = ({ itemsLeft, onClearCompletedClick }) => {
  const location = useLocation();
  const filter = React.useMemo(() => getFilterFromPath(location.pathname), [location.pathname]);

  return (
    <footer className="footer">
      {/* <!-- This should be `0 items left` by default --> */}
      <span className="todo-count">
        <strong>{itemsLeft}</strong> item left
      </span>
      {/* <!-- Remove this if you don't implement routing --> */}
      <ul className="filters">
        <li>
          <a className={filter === 'all' ? 'selected' : ''} href="#/all">
            All
          </a>
        </li>
        <li>
          <a className={filter === 'active' ? 'selected' : ''} href="#/active">
            Active
          </a>
        </li>
        <li>
          <a className={filter === 'completed' ? 'selected' : ''} href="#/completed">
            Completed
          </a>
        </li>
      </ul>
      {/* <!-- Hidden if no completed items are left ↓ --> */}
      <button className="clear-completed" onClick={onClearCompletedClick}>
        Clear completed
      </button>
    </footer>
  );
};
