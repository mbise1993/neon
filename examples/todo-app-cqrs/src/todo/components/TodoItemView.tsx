import React from 'react';

import { TodoItem } from '../models/todoItem.model';

interface Props {
  todoItem: TodoItem;
  onTextChange(value: string): void;
  onToggleDoneClick(): void;
  onDeleteClick(): void;
}

export const TodoItemView: React.FC<Props> = ({
  todoItem,
  onTextChange,
  onToggleDoneClick,
  onDeleteClick,
}) => {
  const [state, setState] = React.useState({
    editText: todoItem.text,
    isEditing: false,
  });

  let className = '';
  if (state.isEditing) {
    className += 'editing';
  }

  if (todoItem.isDone) {
    className += ' complete';
  }

  const handleDoubleClick = () => {
    setState({
      ...state,
      isEditing: true,
    });
  };

  const handleTextChange = (value: string) => {
    setState({
      ...state,
      editText: value,
    });
  };

  const handleKeyDown = (keyCode: number) => {
    // Enter
    if (keyCode === 13) {
      onTextChange(state.editText);
      setState({
        editText: '',
        isEditing: false,
      });
    }
  };

  return (
    <li className={className} onDoubleClick={() => handleDoubleClick()}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todoItem.isDone}
          onChange={() => onToggleDoneClick()}
        />
        <label>{todoItem.text}</label>
        <button className="destroy" onClick={() => onDeleteClick()}></button>
      </div>
      <input
        className="edit"
        value={state.editText}
        onChange={e => handleTextChange(e.target.value)}
        onKeyDown={e => handleKeyDown(e.keyCode)}
      />
    </li>
  );
};
