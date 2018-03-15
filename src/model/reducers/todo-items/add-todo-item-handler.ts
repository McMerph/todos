import IAction from "../../IAction";
import ITodoItem from "../../ITodoItem";
import TodoItemsHandler from "./todo-items-handler";

interface IAddTodoAction extends IAction {
  text: string;
}

export const ADD_TODO_ACTION_TYPE = "ADD_TODO";

export default class AddTodoItemHandler extends TodoItemsHandler {

  protected selfHandle(parameters: { todoItems: ITodoItem[], action: IAction }): ITodoItem[] {
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
    const cast: IAddTodoAction = action as IAddTodoAction;
    return cast.type === ADD_TODO_ACTION_TYPE && cast.text !== undefined;
  }

}
