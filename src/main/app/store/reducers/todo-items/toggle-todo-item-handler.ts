import TodoItemsHandler from './todo-items-handler';
import AppAction from '../../actions/app-action';
import { isToggleTodoAction, ToggleTodoAction } from '../../actions/todo-item/toggle-todo-action';
import TodoItem from '../../todo-item';

export default class ToggleTodoItemHandler extends TodoItemsHandler {

  protected isSuitableAction(action: AppAction): action is ToggleTodoAction {
    return isToggleTodoAction(action);
  }

  public selfHandle(parameters: { todoItems: TodoItem[], action: AppAction }): TodoItem[] {
    return parameters.todoItems.map(todo =>
      todo.id === (parameters.action as ToggleTodoAction).id ?
        {
          ...todo,
          completed: !todo.completed
        } :
        todo);
  }

}
