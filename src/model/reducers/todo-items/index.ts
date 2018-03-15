import IAction from "../../IAction";
import ITodoItem from "../../ITodoItem";
import AddTodoItemHandler from "./AddTodoItemHandler";
import ToggleTodoItemHandler from "./ToggleTodoItemHandler";

let id: number = 0;

const initial: ITodoItem[] = [
  {
    completed: true,
    id: id++,
    text: "Work",
  },
  {
    completed: false,
    id: id++,
    text: "Learn",
  },
  {
    completed: false,
    id: id++,
    text: "Drink beer",
  },
];

export const todoItems = (state: ITodoItem[] = initial, action: IAction): ITodoItem[] => {
  return new AddTodoItemHandler(new ToggleTodoItemHandler()).handle({ todoItems: state, action });
};
