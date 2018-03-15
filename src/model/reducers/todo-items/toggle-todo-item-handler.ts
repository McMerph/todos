import { isToggleTodoAction, IToggleTodoAction } from "../../actions/todo-item/IToggleTodoAction";
import IAction from "../../IAction";
import ITodoItem from "../../ITodoItem";
import TodoItemsHandler from "./todo-items-handler";

export default class ToggleTodoItemHandler extends TodoItemsHandler {

  public selfHandle(parameters: { todoItems: ITodoItem[], action: IAction }): ITodoItem[] {
    return parameters.todoItems.map((todo) =>
      todo.id === (parameters.action as IToggleTodoAction).id ?
        {
          ...todo,
          completed: !todo.completed,
        } :
        todo);
  }

  protected isSuitableAction(action: IAction): action is IToggleTodoAction {
    return isToggleTodoAction(action);
  }

}
