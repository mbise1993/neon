import React from 'react';

import { TodoItem } from '../models/todoItem.model';
import { useTodoItemFacade } from '../facades/todoItem.facade';

interface Props {
  todoItem: TodoItem;
}

export const TodoItemView: React.FC<Props> = ({ todoItem }) => {
  const facade = useTodoItemFacade(todoItem);

  let className = '';
  if (facade.isEditing) {
    className += 'editing';
  }

  if (facade.isDone) {
    className += ' complete';
  }

  return (
    <li className={className} onDoubleClick={() => facade.startEditing()}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={facade.isDone}
          onChange={() => facade.toggleDone()}
        />
        <label>{facade.text}</label>
        <button className="destroy" onClick={() => facade.deleteItem()}></button>
      </div>
      <input
        className="edit"
        value={facade.editText}
        onChange={e => facade.handleTextChange(e.target.value)}
        onKeyDown={e => facade.handleKeyDown(e.keyCode)}
      />
    </li>
  );
};
