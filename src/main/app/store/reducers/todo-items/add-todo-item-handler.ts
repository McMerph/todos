import TodoItemsHandler from './todo-items-handler';
import AppAction from '../../actions/app-action';
import { AddTodoAction, isAddTodoAction } from '../../actions/todo-item/add-todo-action';
import TodoItem from '../../todo-item';

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
