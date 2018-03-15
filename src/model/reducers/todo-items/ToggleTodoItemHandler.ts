import ActionType from "../../actions/ActionType";
import IAction from "../../actions/IAction";
import ITodoItem from "../../ITodoItem";
import TodoItemsHandler from "./TodoItemsHandler";

interface IToggleTodoAction extends IAction {
  id: number;
}

export default class ToggleTodoItemHandler extends TodoItemsHandler {

  public selfHandle(state: ITodoItem[], action: IToggleTodoAction): ITodoItem[] {
    return state.map((todo) =>
      todo.id === action.id ? { ...todo, completed: !todo.completed } : todo);
  }

  protected isSuitableAction(action: IAction): action is IToggleTodoAction {
    const cast: IToggleTodoAction = action as IToggleTodoAction;
    return cast.type === ActionType.ToggleTodo && cast.id !== undefined;
  }

}
