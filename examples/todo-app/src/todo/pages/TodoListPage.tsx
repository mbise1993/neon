import React from 'react';

import { useBind, useObserve, useViewModel } from '@neon/react';

import { Filter } from '../../common/utils/filter';
import { TodoListFooter } from '../components/TodoListFooter';
import { TodoListView } from '../components/TodoList';
import { TodoListViewModel } from '../viewModels/todoList.viewModel';

export const TodoListPage: React.FC = () => {
  const vm = useViewModel(TodoListViewModel, {
    filter: Filter.ALL,
  });

  const [newItemText, setNewItemText] = useBind(vm.$newItemText);
  const hasItems = useObserve(vm.$hasItems, false);
  const itemsLeftCount = useObserve(vm.$itemsLeftCount, 0);

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
          onChange={e => setNewItemText(e.target.value)}
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
