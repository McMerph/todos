import { createStore } from 'redux';
import TodoItem from './TodoItem';
import { Filters } from './actions/filter/SetFilterAction';
import { combinedReducer } from './reducers/CombinedReducer';

const enhancer = window['devToolsExtension'] ? window['devToolsExtension']()(createStore) : createStore;
export const store = enhancer(combinedReducer);

export interface AppStore {

  filter: Filters;
  todoItems: TodoItem[];

}
