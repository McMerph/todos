import FilterType from "./FilterType";
import { SET_FILTER_ACTION_TYPE } from "./reducers/filter";
import { ADD_TODO_ACTION_TYPE } from "./reducers/todo-items/AddTodoItemHandler";
import { TOGGLE_TODO_ACTION_TYPE } from "./reducers/todo-items/ToggleTodoItemHandler";

export const actionCreator = {
  addTodo: (text: string) => ({ type: ADD_TODO_ACTION_TYPE, text }),
  setFilterType: (filterType: FilterType) => ({ type: SET_FILTER_ACTION_TYPE, filterType }),
  toggleTodo: (id: number) => ({ type: TOGGLE_TODO_ACTION_TYPE, id }),
};
