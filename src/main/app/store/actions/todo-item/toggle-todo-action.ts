import AppAction from '../app-action';

export const TOGGLE_TODO_ACTION_TYPE = 'TOGGLE_TODO';

export interface ToggleTodoAction extends AppAction {

  id: number;

}

export function isToggleTodoAction(action: AppAction): action is ToggleTodoAction {
  const cast: ToggleTodoAction = action as ToggleTodoAction;
  return cast.type === TOGGLE_TODO_ACTION_TYPE && cast.id !== undefined;
}
