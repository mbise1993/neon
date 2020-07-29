import React from 'react';
import { useLocation } from 'react-router';

import { useViewModel } from '@neon/react';

import { getFilterFromPath } from '../../common/utils/filter';
import { TodoItemView } from '../components/TodoItemView';
import { TodoListFooter } from '../components/TodoListFooter';
import { TodoListViewModel } from '../viewModels/todoList.viewModel';
// import { useTodoListFacade } from '../facades/todoList.facade';

export const TodoListPage: React.FC = () => {
  // const facade = useTodoListFacade();
  const location = useLocation();
  const vm = useViewModel(TodoListViewModel);

  React.useEffect(() => {
    vm.setState({ filter: getFilterFromPath(location.pathname) });
  }, [location]);

  const onTextChange = (value: string) => {
    vm.setState({ newItemText: value });
  };

  const onKeyDown = (keyCode: number) => {
    // Enter
    if (keyCode === 13) {
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
          value={vm.state.newItemText}
          onChange={e => onTextChange(e.target.value)}
          onKeyDown={e => onKeyDown(e.keyCode)}
        />
      </header>
      {/* <!-- This section should be hidden by default and shown when there are todos --> */}
      {vm.state.hasItems && (
        <section className="main">
          <input
            id="toggle-all"
            className="toggle-all"
            type="checkbox"
            checked={vm.state.itemsLeftCount === 0}
            onChange={() => vm.toggleAll()}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ul className="todo-list">
            {/* <!-- List items should get the class `editing` when editing and `completed` when marked as completed --> */}
            {vm.state.filteredItems.map(item => (
              <TodoItemView key={item.id} todoItem={item} />
            ))}
          </ul>
        </section>
      )}
      {/* <!-- This footer should hidden by default and shown when there are todos --> */}
      <TodoListFooter
        itemsLeft={vm.state.itemsLeftCount}
        onClearCompletedClick={() => vm.clearCompletedItems()}
      />
    </section>
  );
};
