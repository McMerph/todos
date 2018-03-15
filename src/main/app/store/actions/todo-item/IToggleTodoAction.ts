import IAction from "../IAction";

export const TOGGLE_TODO_ACTION_TYPE = "TOGGLE_TODO";

export interface IToggleTodoAction extends IAction {

  id: number;

}

export function isToggleTodoAction(action: IAction): action is IToggleTodoAction {
  const cast: IToggleTodoAction = action as IToggleTodoAction;
  return cast.type === TOGGLE_TODO_ACTION_TYPE && cast.id !== undefined;
}
