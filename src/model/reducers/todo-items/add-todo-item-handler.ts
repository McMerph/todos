import IAction from "../../actions/IAction";
import { IAddTodoAction, isAddTodoAction } from "../../actions/todo-item/IAddTodoAction";
import ITodoItem from "../../ITodoItem";
import TodoItemsHandler from "./todo-items-handler";

export default class AddTodoItemHandler extends TodoItemsHandler {

  public selfHandle(parameters: { todoItems: ITodoItem[], action: IAction }): ITodoItem[] {
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
