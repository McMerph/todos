import TodoItemsHandler from './TodoItemsHandler';
import AppAction from '../../actions/AppAction';
import { isToggleTodoAction, ToggleTodoAction } from '../../actions/todo-item/ToggleTodoAction';
import TodoItem from '../../TodoItem';

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
