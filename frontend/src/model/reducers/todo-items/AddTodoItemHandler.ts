import ActionType from "../../actions/ActionType";
import IAction from "../../actions/IAction";
import ITodoItem from "../../ITodoItem";
import TodoItemsHandler from "./TodoItemsHandler";

interface IAddTodoAction extends IAction {
  text: string;
}

export default class AddTodoItemHandler extends TodoItemsHandler {

  protected selfHandle(state: ITodoItem[], action: IAddTodoAction): ITodoItem[] {
    return [...state, { completed: false, id: state.length, text: action.text }];
  }

  protected isSuitableAction(action: IAction): action is IAddTodoAction {
    const cast: IAddTodoAction = action as IAddTodoAction;
    return cast.type === ActionType.AddTodo && cast.text !== undefined;
  }

}
