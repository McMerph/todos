import IAction from "../../actions/IAction";
import { isToggleTodoAction, IToggleTodoAction } from "../../actions/todo-item/IToggleTodoAction";
import TodoItem from "../../todo-item";
import TodoItemsHandler from "./todo-items-handler";

export default class ToggleTodoItemHandler extends TodoItemsHandler {

  public selfHandle(parameters: { todoItems: TodoItem[], action: IAction }): TodoItem[] {
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
