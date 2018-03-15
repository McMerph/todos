import { FilterType, SET_FILTER_ACTION_TYPE } from "./reducers/filter";
import { ADD_TODO_ACTION_TYPE } from "./reducers/todo-items/add-todo-item-handler";
import { TOGGLE_TODO_ACTION_TYPE } from "./reducers/todo-items/toggle-todo-item-handler";

export const actionCreator = {
  addTodo: (text: string) => ({type: ADD_TODO_ACTION_TYPE, text}),
  setFilterType: (filterType: FilterType) => ({type: SET_FILTER_ACTION_TYPE, filterType}),
  toggleTodo: (id: number) => ({type: TOGGLE_TODO_ACTION_TYPE, id}),
};
