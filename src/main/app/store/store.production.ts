import { createStore } from 'redux';
import TodoItem from './todo-item';
import { Filters } from './actions/filter/set-filter-action';
import { combinedReducer } from './reducers/combined-reducer';

export const store = createStore(combinedReducer);

// TODO Delete? Unused
export interface AppStore {

  filter: Filters;
  todoItems: TodoItem[];

}
