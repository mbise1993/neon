import React from 'react';
import { useLocation } from 'react-router';

import { useInject, useObservable } from '@neon/react';

import { Filter, getFilterFromPath } from '../../common/utils/filter';
import { TodoListService } from '../services/todoList.service';

export function useTodoListFacade() {
  const todoListService = useInject(TodoListService);
  const items = useObservable(todoListService.items$, []);
  const location = useLocation();
  const [state, setState] = React.useState({
    newItemText: '',
    isToggleAllChecked: false,
  });

  React.useEffect(() => {
    todoListService.loadItems();
  }, []);

  const handleTextChange = (value: string) => {
    setState({
      ...state,
      newItemText: value,
    });
  };

  const handleKeyDown = (keyCode: number) => {
    // Enter
    if (keyCode === 13) {
      addItem();
    }
  };

  const addItem = () => {
    todoListService.addItem(state.newItemText);

    setState({
      ...state,
      newItemText: '',
    });
  };

  const toggleAll = () => {
    for (const item of items) {
      todoListService.updateItem(item.id, item.text, !state.isToggleAllChecked);
    }

    setState({
      ...state,
      isToggleAllChecked: !state.isToggleAllChecked,
    });
  };

  const clearCompletedItems = () => {
    const completedItems = items.filter(item => item.isDone);
    for (const item of completedItems) {
      todoListService.deleteItem(item.id);
    }
  };

  const deleteItem = (itemId: string) => {
    todoListService.deleteItem(itemId);
  };

  const filterItems = () => {
    const filter = getFilterFromPath(location.pathname);
    return items.filter(item => {
      if (filter === Filter.ACTIVE) {
        return !item.isDone;
      } else if (filter === Filter.COMPLETED) {
        return item.isDone;
      } else {
        return items;
      }
    });
  };

  return {
    items,
    hasItems: items.length > 0,
    itemsLeftCount: items.filter(item => !item.isDone).length,
    filteredItems: filterItems(),
    ...state,
    handleTextChange,
    handleKeyDown,
    addItem,
    toggleAll,
    clearCompletedItems,
    deleteItem,
  };
}
