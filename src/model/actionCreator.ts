import FilterType from "./FilterType";
import { SET_FILTER_ACTION_TYPE } from "./reducers/filter";
import { ADD_TODO_ACTION_TYPE } from "./reducers/todo-items/AddTodoItemHandler";
import { TOGGLE_TODO_ACTION_TYPE } from "./reducers/todo-items/ToggleTodoItemHandler";

const actionCreator = {
  addTodo: (text: string) => ({ type: ADD_TODO_ACTION_TYPE, text }),
  setFilter: (filter: FilterType) => ({ type: SET_FILTER_ACTION_TYPE, filter }),
  toggleTodo: (id: number) => ({ type: TOGGLE_TODO_ACTION_TYPE, id }),
};

export default actionCreator;
