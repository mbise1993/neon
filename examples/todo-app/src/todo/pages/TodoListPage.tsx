import React from 'react';

import { useObservable, useViewModel } from '@neon/react';

import { TodoListFooter } from '../components/TodoListFooter';
import { TodoListView } from '../components/TodoList';
import { TodoListViewModel } from '../viewModels/todoList.viewModel';

export const TodoListPage: React.FC = () => {
  const vm = useViewModel(TodoListViewModel, {
    filter: 'all',
  });

  const newItemText = useObservable(vm.$newItemText, '');
  const hasItems = useObservable(vm.$hasItems, false);
  const itemsLeftCount = useObservable(vm.$itemsLeftCount, 0);

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
          value={newItemText}
          onChange={e => vm.setNewItemText(e.target.value)}
          onKeyDown={onKeyDown}
        />
      </header>
      {/* <!-- This section should be hidden by default and shown when there are todos --> */}
      {hasItems && (
        <section className="main">
          <input
            id="toggle-all"
            className="toggle-all"
            type="checkbox"
            checked={itemsLeftCount === 0}
            onChange={() => vm.toggleAll()}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <TodoListView />
        </section>
      )}
      {/* <!-- This footer should hidden by default and shown when there are todos --> */}
      <TodoListFooter
        itemsLeft={itemsLeftCount}
        onClearCompletedClick={() => vm.clearCompletedItems()}
      />
    </section>
  );
};
