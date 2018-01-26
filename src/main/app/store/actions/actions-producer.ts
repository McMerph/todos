import { ADD_TODO_ACTION_TYPE, AddTodoAction } from './todo-item/add-todo-action';
import { TOGGLE_TODO_ACTION_TYPE, ToggleTodoAction } from './todo-item/toggle-todo-action';
import { Filters, SET_FILTER_ACTION_TYPE, SetFilterAction } from './filter/set-filter-action';

interface ActionProducer {

  addTodo: (text: string) => AddTodoAction;
  toggleTodo: (id: number) => ToggleTodoAction;
  setFilter: (filter: Filters) => SetFilterAction;

}

export const actionProducer: ActionProducer = {

  addTodo: text => ({type: ADD_TODO_ACTION_TYPE, text}),
  toggleTodo: id => ({type: TOGGLE_TODO_ACTION_TYPE, id}),
  setFilter: filter => ({type: SET_FILTER_ACTION_TYPE, filter})

};
