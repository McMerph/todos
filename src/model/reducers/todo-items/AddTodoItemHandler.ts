import IAction from "../../IAction";
import ITodoItem from "../../ITodoItem";
import TodoItemsHandler from "./TodoItemsHandler";

interface IAddTodoAction extends IAction {
  text: string;
}

export const ADD_TODO_ACTION_TYPE = "ADD_TODO";

export default class AddTodoItemHandler extends TodoItemsHandler {

  protected selfHandle(parameters: { todoItems: ITodoItem[], action: IAddTodoAction }): ITodoItem[] {
    const { todoItems, action } = parameters;
    return [...todoItems, { completed: false, id: todoItems.length, text: action.text }];
  }

  protected isSuitableAction(action: IAction): action is IAddTodoAction {
    const cast: IAddTodoAction = action as IAddTodoAction;
    return cast.type === ADD_TODO_ACTION_TYPE && cast.text !== undefined;
  }

}
