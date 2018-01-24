import TodoItemsHandler from './TodoItemsHandler';
import AppAction from '../../actions/AppAction';
import { AddTodoAction, isAddTodoAction } from '../../actions/todo-item/AddTodoAction';
import TodoItem from '../../TodoItem';

export default class AddTodoItemHandler extends TodoItemsHandler {

  protected isSuitableAction(action: AppAction): action is AddTodoAction {
    return isAddTodoAction(action);
  }

  public selfHandle(parameters: { todoItems: TodoItem[], action: AppAction }): TodoItem[] {
    return [
      ...parameters.todoItems,
      {
        id: parameters.todoItems.length,
        text: (parameters.action as AddTodoAction).text,
        completed: false
      }
    ];
  }

}
