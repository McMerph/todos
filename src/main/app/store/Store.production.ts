import { createStore } from 'redux';
import TodoItem from './TodoItem';
import { Filters } from './actions/filter/SetFilterAction';
import { combinedReducer } from './reducers/CombinedReducer';

export const store = createStore(combinedReducer);

// TODO Delete? Unused
export interface AppStore {

  filter: Filters;
  todoItems: TodoItem[];

}
