import IAction from "../../IAction";
import ITodoItem from "../../ITodoItem";
import TodoItemsHandler from "./todo-items-handler";

interface IToggleTodoAction extends IAction {
  id: number;
}

export const TOGGLE_TODO_ACTION_TYPE = "TOGGLE_TODO";

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
    const cast: IToggleTodoAction = action as IToggleTodoAction;
    return cast.type === TOGGLE_TODO_ACTION_TYPE && cast.id !== undefined;
  }

}
