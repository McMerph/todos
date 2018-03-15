import IAction from "../../actions/IAction";
import TodoItem from "../../todo-item";
import AddTodoItemHandler from "./add-todo-item-handler";
import ToggleTodoItemHandler from "./toggle-todo-item-handler";

const initial: TodoItem[] = [
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

export const todoItemsReducer = (todoItems: TodoItem[] = initial, action: IAction): TodoItem[] => {
  return new AddTodoItemHandler(new ToggleTodoItemHandler()).handle({todoItems, action});
};
