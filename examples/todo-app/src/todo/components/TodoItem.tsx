import React from 'react';

import { Model } from '@neon/core';
import { useVm } from '@neon/react';

import { TodoItemFields } from '../models/todoItem.model';
import { TodoItemViewModel } from '../viewModels/todoItem.viewModel';

interface Props {
  todoItem: Model<TodoItemFields>;
}

export const TodoItem: React.FC<Props> = ({ todoItem }) => {
  const vm = useVm(TodoItemViewModel, (vm, bind) => {
    vm.setModel(todoItem);
    bind(vm.editText);
    bind(vm.isEditing);
  });

  const onKeyDown = (e: React.KeyboardEvent) => {
    // Enter
    if (e.keyCode === 13) {
      vm.commitEditText();
    }
  };

  let className = '';
  if (vm.isEditing.value) {
    className += 'editing';
  }

  if (vm.isDone) {
    className += ' complete';
  }

  return (
    <li className={className} onDoubleClick={() => vm.startEditing()}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={vm.isDone}
          onChange={() => vm.toggleComplete()}
        />
        <label>{vm.text}</label>
        <button className="destroy" onClick={() => vm.deleteItem()}></button>
      </div>
      <input
        className="edit"
        value={vm.editText.value}
        onChange={e => vm.editText.next(e.target.value)}
        onKeyDown={onKeyDown}
      />
    </li>
  );
};
