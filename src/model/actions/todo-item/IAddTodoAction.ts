import IAction from "../../IAction";

export const ADD_TODO_ACTION_TYPE = "ADD_TODO";

export interface IAddTodoAction extends IAction {
  text: string;
}

export function isAddTodoAction(action: IAction): action is IAddTodoAction {
  const cast: IAddTodoAction = action as IAddTodoAction;
  return cast.type === ADD_TODO_ACTION_TYPE && cast.text !== undefined;
}
