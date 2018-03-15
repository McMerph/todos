import IAction from "../../IAction";
import ITodoItem from "../../ITodoItem";
import AddTodoItemHandler from "./add-todo-item-handler";
import ToggleTodoItemHandler from "./toggle-todo-item-handler";

const initial: ITodoItem[] = [
  {
    completed: true,
    id: 0,
    text: "Work",
  },
  {
    completed: false,
    id: 1,
    text: "Learn",
  },
  {
    completed: false,
    id: 2,
    text: "Drink beer",
  },
];

export const todoItemsReducer = (todoItems: ITodoItem[] = initial, action: IAction): ITodoItem[] => {
  return new AddTodoItemHandler(new ToggleTodoItemHandler()).handle({todoItems, action});
};
