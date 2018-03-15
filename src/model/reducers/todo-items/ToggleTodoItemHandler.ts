import IAction from "../../IAction";
import ITodoItem from "../../ITodoItem";
import TodoItemsHandler from "./TodoItemsHandler";

interface IToggleTodoAction extends IAction {
  id: number;
}

export const TOGGLE_TODO_ACTION_TYPE = "TOGGLE_TODO";

export default class ToggleTodoItemHandler extends TodoItemsHandler {

  public selfHandle(parameters: { todoItems: ITodoItem[], action: IToggleTodoAction }): ITodoItem[] {
    const { todoItems, action } = parameters;
    return todoItems.map((todo) =>
      todo.id === action.id ? { ...todo, completed: !todo.completed } : todo);
  }

  protected isSuitableAction(action: IAction): action is IToggleTodoAction {
    const cast: IToggleTodoAction = action as IToggleTodoAction;
    return cast.type === TOGGLE_TODO_ACTION_TYPE && cast.id !== undefined;
  }

}
