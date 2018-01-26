import { AppStore } from '../store';
import { combineReducers } from 'redux';
import { filterReducer } from './filter/filter-reducer';
import { todoItemsReducer } from './todo-items/todo-items-reducer';

export const combinedReducer = combineReducers<AppStore>({
  todoItems: todoItemsReducer,
  filter: filterReducer
});
