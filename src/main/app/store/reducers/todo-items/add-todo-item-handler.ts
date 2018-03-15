import IAction from "../../actions/IAction";
import { IAddTodoAction, isAddTodoAction } from "../../actions/todo-item/IAddTodoAction";
import TodoItem from "../../todo-item";
import TodoItemsHandler from "./todo-items-handler";

export default class AddTodoItemHandler extends TodoItemsHandler {

  public selfHandle(parameters: { todoItems: TodoItem[], action: IAction }): TodoItem[] {
    return [
      ...parameters.todoItems,
      {
        completed: false,
        id: parameters.todoItems.length,
        text: (parameters.action as IAddTodoAction).text,
      },
    ];
  }

  protected isSuitableAction(action: IAction): action is IAddTodoAction {
    return isAddTodoAction(action);
  }

}
