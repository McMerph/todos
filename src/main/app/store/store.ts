import { createStore } from 'redux';
import TodoItem from './todo-item';
import { Filters } from './actions/filter/set-filter-action';
import { combinedReducer } from './reducers/combined-reducer';

const enhancer = window['devToolsExtension'] ? window['devToolsExtension']()(createStore) : createStore;
export const store = enhancer(combinedReducer);

export interface AppStore {

  filter: Filters;
  todoItems: TodoItem[];

}
