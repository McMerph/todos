import ActionType from "../actions/ActionType";
import IAction from "../actions/IAction";
import ITodoItem, { isTodoItem } from "../ITodoItem";

interface IAddTodoAction extends IAction {
  text: string;
}

interface IToggleTodoAction extends IAction {
  index: number;
}

interface ISetTodoItemsAction extends IAction {
  todoItems: ITodoItem[];
}

function isAddTodoAction(action: IAction): action is IAddTodoAction {
  const cast: IAddTodoAction = action as IAddTodoAction;
  return cast.type === ActionType.AddTodo && typeof cast.text === "string";
}

function isToggleTodoAction(action: IAction): action is IToggleTodoAction {
  const cast: IToggleTodoAction = action as IToggleTodoAction;
  return cast.type === ActionType.ToggleTodo && typeof cast.index === "number";
}

function isSetTodoItemsAction(action: IAction): action is ISetTodoItemsAction {
  const cast: ISetTodoItemsAction = action as ISetTodoItemsAction;
  return cast.type === ActionType.SetTodoItems &&
    cast.todoItems instanceof Array &&
    cast.todoItems.every((item) => isTodoItem(item));
}

export const todoItems = (state: ITodoItem[] = [], action: IAction): ITodoItem[] => {
    if (isAddTodoAction(action)) {
      return [...state, { completed: false, id: state.length, text: action.text }];
    } else if (isToggleTodoAction(action)) {
      return state.map((todo, index) =>
        index === action.index ? { ...todo, completed: !todo.completed } : todo);
    } else if (isSetTodoItemsAction(action)) {
      return action.todoItems;
    } else {
      return state;
    }
  }
;
