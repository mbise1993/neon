import React from 'react';

import { TodoItemView } from '../components/TodoItemView';
import { TodoListFooter } from '../components/TodoListFooter';

import { useTodoListFacade } from '../facades/todoList.facade';

export const TodoListPage: React.FC = () => {
  const facade = useTodoListFacade();

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todo_mvvm</h1>
        <input
          autoFocus
          className="new-todo"
          placeholder="What needs to be done?"
          value={facade.newItemText}
          onChange={e => facade.handleTextChange(e.target.value)}
          onKeyDown={e => facade.handleKeyDown(e.keyCode)}
        />
      </header>
      {/* <!-- This section should be hidden by default and shown when there are todos --> */}
      {facade.hasItems && (
        <section className="main">
          <input
            id="toggle-all"
            className="toggle-all"
            type="checkbox"
            checked={facade.itemsLeftCount === 0}
            onChange={() => facade.toggleAll()}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ul className="todo-list">
            {/* <!-- List items should get the class `editing` when editing and `completed` when marked as completed --> */}
            {facade.filteredItems.map(item => (
              <TodoItemView key={item.id} todoItem={item} />
            ))}
          </ul>
        </section>
      )}
      {/* <!-- This footer should hidden by default and shown when there are todos --> */}
      <TodoListFooter
        itemsLeft={facade.itemsLeftCount}
        onClearCompletedClick={() => facade.clearCompletedItems()}
      />
    </section>
  );
};
