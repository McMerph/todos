import AppAction from '../app-action';

export const ADD_TODO_ACTION_TYPE = 'ADD_TODO';

export interface AddTodoAction extends AppAction {

  text: string;

}

export function isAddTodoAction(action: AppAction): action is AddTodoAction {
  const cast: AddTodoAction = action as AddTodoAction;
  return cast.type === ADD_TODO_ACTION_TYPE && cast.text !== undefined;
}
