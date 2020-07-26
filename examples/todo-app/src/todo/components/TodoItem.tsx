import React from 'react';

import { Model } from '@neon/core';
import { useViewModel } from '@neon/react';

import { TodoItemFields } from '../models/todoItem.model';
import { TodoItemViewModel } from '../viewModels/todoItem.viewModel';

interface Props {
  todoItem: Model<TodoItemFields>;
}

export const TodoItem: React.FC<Props> = ({ todoItem }) => {
  const vm = useViewModel(TodoItemViewModel, vm => {
    vm.setModel(todoItem);
  });

  const onKeyDown = async (e: React.KeyboardEvent) => {
    // Enter
    if (e.keyCode === 13) {
      vm.commitEditText();
    }
  };

  let className = '';
  if (vm.getIsEditing()) {
    className += 'editing';
  }

  if (vm.getIsDone()) {
    className += ' complete';
  }

  return (
    <li className={className} onDoubleClick={() => vm.startEditing()}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={vm.getIsDone()}
          onChange={() => vm.toggleComplete()}
        />
        <label>{vm.getText()}</label>
        <button className="destroy" onClick={() => vm.deleteItem()}></button>
      </div>
      <input
        className="edit"
        value={vm.getEditText()}
        onChange={e => vm.setEditText(e.target.value)}
        onKeyDown={onKeyDown}
      />
    </li>
  );
};
