import { Filter, SET_FILTER_ACTION_TYPE } from "./filter/ISetFilterAction";
import { ADD_TODO_ACTION_TYPE } from "./todo-item/IAddTodoAction";
import { TOGGLE_TODO_ACTION_TYPE } from "./todo-item/IToggleTodoAction";

export const actionCreator = {
  addTodo: (text: string) => ({type: ADD_TODO_ACTION_TYPE, text}),
  setFilter: (filter: Filter) => ({type: SET_FILTER_ACTION_TYPE, filter}),
  toggleTodo: (id: number) => ({type: TOGGLE_TODO_ACTION_TYPE, id}),
};
