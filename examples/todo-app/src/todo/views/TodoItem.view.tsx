import React from 'react';

import { useObservable, useViewModel } from '@neon/react';

import { TodoItem } from '../models/todoItem.model';
import { TodoItemViewModel } from '../viewModels/todoItem.viewModel';

interface Props {
  todoItem: TodoItem;
}

export const TodoItemView: React.FC<Props> = ({ todoItem }) => {
  const vm = useViewModel(TodoItemViewModel, {
    todoItem,
  });

  const editText = useObservable(vm.$editText, '');
  const isEditing = useObservable(vm.$isEditing, false);

  const onKeyDown = async (e: React.KeyboardEvent) => {
    // Enter
    if (e.keyCode === 13) {
      vm.commitEditText();
    }
  };

  let className = '';
  if (isEditing) {
    className += 'editing';
  }

  if (vm.getTodoItem().isComplete()) {
    className += ' complete';
  }

  return (
    <li className={className} onDoubleClick={() => vm.startEditing()}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todoItem.isComplete()}
          onChange={() => vm.toggleComplete()}
        />
        <label>{vm.getTodoItem().getText()}</label>
        <button className="destroy" onClick={() => vm.deleteItem()}></button>
      </div>
      <input
        className="edit"
        value={editText}
        onChange={e => vm.setEditText(e.target.value)}
        onKeyDown={onKeyDown}
      />
    </li>
  );
};
