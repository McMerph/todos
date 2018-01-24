import { AppStore } from '../Store';
import { combineReducers } from 'redux';
import { filterReducer } from './filter/FilterReducer';
import { todoItemsReducer } from './todo-items/TodoItemsReducer';

export const combinedReducer = combineReducers<AppStore>({
  todoItems: todoItemsReducer,
  filter: filterReducer
});
