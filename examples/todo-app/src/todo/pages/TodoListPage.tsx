import React from 'react';
import { useLocation } from 'react-router';

import { useViewModel } from '@neon/react';

import { getFilterFromPath } from '../../common/utils/filter';
import { TodoItem } from '..//components/TodoItem';
import { TodoListFooter } from '../components/TodoListFooter';

import { TodoListViewModel } from '../viewModels/todoList.viewModel';

export const TodoListPage: React.FC = () => {
  const location = useLocation();
  const vm = useViewModel(TodoListViewModel);

  React.useEffect(() => {
    vm.setFilter(getFilterFromPath(location.pathname));
  }, [location]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    // Enter
    if (e.keyCode === 13) {
      vm.addItem();
    }
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todo_mvvm</h1>
        <input
          autoFocus
          className="new-todo"
          placeholder="What needs to be done?"
          value={vm.getNewItemText()}
          onChange={e => vm.setNewItemText(e.target.value)}
          onKeyDown={onKeyDown}
        />
      </header>
      {/* <!-- This section should be hidden by default and shown when there are todos --> */}
      {vm.hasItems() && (
        <section className="main">
          <input
            id="toggle-all"
            className="toggle-all"
            type="checkbox"
            checked={vm.getItemsLeftCount() === 0}
            onChange={() => vm.toggleAll()}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ul className="todo-list">
            {/* <!-- List items should get the class `editing` when editing and `completed` when marked as completed --> */}
            {vm.getFilteredItems().map(item => (
              <TodoItem key={item.get('id')} todoItem={item} />
            ))}
          </ul>
        </section>
      )}
      {/* <!-- This footer should hidden by default and shown when there are todos --> */}
      <TodoListFooter
        itemsLeft={vm.getItemsLeftCount()}
        onClearCompletedClick={() => vm.clearCompletedItems()}
      />
    </section>
  );
};
