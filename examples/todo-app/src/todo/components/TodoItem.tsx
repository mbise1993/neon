import React from 'react';

import { useBind, useObserve, useViewModel } from '@neon/react';

import { Model, TodoItemFields } from '../models/todoItem.model';
import { TodoItemViewModel } from '../viewModels/todoItem.viewModel';

interface Props {
  todoItem: Model<TodoItemFields>;
}

export const TodoItemView: React.FC<Props> = ({ todoItem }) => {
  const vm = useViewModel(TodoItemViewModel, {
    todoItem,
  });

  const [editText, setEditText] = useBind(vm.$editText);
  const isEditing = useObserve(vm.$isEditing, false);
  const boundItem = useObserve(vm.getTodoItem().$fields, vm.getTodoItem().getFields());

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

  if (vm.getTodoItem().get('isDone')) {
    className += ' complete';
  }

  return (
    <li className={className} onDoubleClick={() => vm.startEditing()}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={boundItem.isDone}
          onChange={() => vm.toggleComplete()}
        />
        <label>{boundItem.text}</label>
        <button className="destroy" onClick={() => vm.deleteItem()}></button>
      </div>
      <input
        className="edit"
        value={editText}
        onChange={e => setEditText(e.target.value)}
        onKeyDown={onKeyDown}
      />
    </li>
  );
};
