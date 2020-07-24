import React from 'react';

import { TodoItemFields } from '../api/todoItemFields.generated';
import { TodoItemViewModel } from '../viewModels/todoItem.viewModel';
import { useObservable, useViewModel } from '../../common/hooks';

interface Props {
  todoItem: TodoItemFields;
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
      await vm.commitEditText();
    }
  };

  let className = '';
  if (isEditing) {
    className += 'editing';
  }

  if (vm.todoItem.done) {
    className += ' complete';
  }

  return (
    <li className={className} onDoubleClick={() => vm.startEditing()}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todoItem.done}
          onChange={() => vm.toggleComplete()}
        />
        <label>{vm.todoItem.task}</label>
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
