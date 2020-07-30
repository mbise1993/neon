import React from 'react';

import { useInject } from '@neon/react';

import { TodoItem } from '../models/todoItem.model';
import { TodoListService } from '../services/todoList.service';

export function useTodoItemFacade(item: TodoItem) {
  const todoListService = useInject(TodoListService);
  const [state, setState] = React.useState({
    editText: '',
    isEditing: false,
  });

  const toggleDone = () => {
    todoListService.updateItem(item.id, item.text, !item.isDone);
  };

  const startEditing = () => {
    setState({
      editText: item.text,
      isEditing: true,
    });
  };

  const handleKeyDown = (keyCode: number) => {
    // Enter
    if (keyCode === 13) {
      commitEdits();
    }
  };

  const handleTextChange = (value: string) => {
    setState({
      ...state,
      editText: value,
    });
  };

  const commitEdits = () => {
    todoListService.updateItem(item.id, state.editText, item.isDone);

    setState({
      editText: '',
      isEditing: false,
    });
  };

  const deleteItem = () => {
    todoListService.deleteItem(item.id);
  };

  return {
    ...item,
    ...state,
    toggleDone,
    startEditing,
    handleKeyDown,
    handleTextChange,
    commitEdits,
    deleteItem,
  };
}
