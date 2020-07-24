import React from 'react';
import { useLocation } from 'react-router';

import { useObserve, useViewModel } from '@neon/react';

import { getFilterFromPath } from '../../common/utils/filter';
import { TodoItemView } from './TodoItem';
import { TodoListViewModel } from '../viewModels/todoList.viewModel';

export const TodoListView: React.FC = () => {
  const location = useLocation();
  const vm = useViewModel(TodoListViewModel, {
    filter: getFilterFromPath(location.pathname),
  });

  const items = useObserve(vm.$filteredItems, []);

  return (
    <ul className="todo-list">
      {/* <!-- List items should get the class `editing` when editing and `completed` when marked as completed --> */}
      {items.map(item => (
        <TodoItemView key={item.get('id')} todoItem={item} />
      ))}
    </ul>
  );
};
