import { Filters, ISetFilterAction, SET_FILTER_ACTION_TYPE } from "./filter/ISetFilterAction";
import { ADD_TODO_ACTION_TYPE, IAddTodoAction } from "./todo-item/IAddTodoAction";
import { IToggleTodoAction, TOGGLE_TODO_ACTION_TYPE } from "./todo-item/IToggleTodoAction";

interface IActionProducer {

  addTodo: (text: string) => IAddTodoAction;
  setFilter: (filter: Filters) => ISetFilterAction;
  toggleTodo: (id: number) => IToggleTodoAction;

}

export const actionProducer: IActionProducer = {

  addTodo: (text) => ({type: ADD_TODO_ACTION_TYPE, text}),
  setFilter: (filter) => ({type: SET_FILTER_ACTION_TYPE, filter}),
  toggleTodo: (id) => ({type: TOGGLE_TODO_ACTION_TYPE, id}),

};
